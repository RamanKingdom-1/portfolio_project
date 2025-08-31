from nba_api.stats.endpoints import playergamelogs, teamgamelog
from nba_api.stats.endpoints import commonallplayers,commonplayerinfo
from nba_api.stats.static import teams

import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, MinMaxScaler


from generating_current_player_ids import getPlayer
import matplotlib.pyplot as plt


from datetime import datetime
import requests
import json


#Calculate their average minutes played the year prior
#Compare that to how many they played in the current game 



def gameDataAgainstOpponent(player_id, next_game_team_id):
    allDates = ['2019-20','2020-21', '2021-22','2022-23','2023-24']
    pointsHolder = []
    
    for literals in allDates:
        gamelogs = playergamelogs.PlayerGameLogs(player_id_nullable=player_id, season_nullable=literals)
        helper = gamelogs.get_data_frames()[0]
        if not helper.empty:
            for idx,x in enumerate(helper['MATCHUP']):
                if next_game_team_id.upper() in x:
                    pointsHolder.append(int(helper['PTS'].iloc[idx]))
            
    
    return pointsHolder


def findNextGame(team_id):
    team_gamelog = teamgamelog.TeamGameLog(team_id=team_id, season = "2024-25")
    team_gamelog_total = requests.get("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json")

    data = team_gamelog_total.json()
    games = team_gamelog.get_data_frames()[0]

    currentDate = datetime.today().date()
    
    if "leagueSchedule" in data and "gameDates" in data["leagueSchedule"]:
        dates = data["leagueSchedule"]["gameDates"]
        for date in dates:
            for game in date["games"]:
                home  = game["homeTeam"]["teamId"]
                away = game["awayTeam"]["teamId"]
                if team_id == home or team_id == away:
                    json_date = datetime.strptime(date["gameDate"],"%m/%d/%Y %H:%M:%S").date()
                    if (json_date >= currentDate):
                        if home == team_id:
                            return game["awayTeam"]["teamTricode"]
                        else:
                            return game["homeTeam"]["teamTricode"]
                    



    #print(games['GAME_DATE'].head())


    return "No Future Games"


def findAndPrintAveragesForPast15(player_id, season):
    gamelogs = playergamelogs.PlayerGameLogs(player_id_nullable=player_id, season_nullable=season)

    helper = gamelogs.get_data_frames()[0]
    total_points = helper['PTS'][len(helper) - 15:len(helper)]
    total_reb = helper['REB'][len(helper) - 15:len(helper)]
    total_assists = helper['AST'][len(helper) - 15:len(helper)]
    total_steals = helper['STL'][len(helper) - 15:len(helper)]
    total_blocks = helper['BLK'][len(helper) - 15:len(helper)]
    total_turnovers = helper['TOV'][len(helper) - 15:len(helper)]
    total_mins = helper['MIN'][0:len(helper)]

    print(f"Average points: {total_points}")
    print(f"Average rebounds: {round(total_reb/15, 1)}")
    print(f"Average assists: {round(total_assists/15, 1)}")
    print(f"Average steals: {round(total_steals/15, 1)}")
    print(f"Averge blocks: {round(total_blocks/15, 1)}")
    print(f"Average turnovers: {round(total_turnovers/15, 1)}")
    print(f"Average minutes: {round(total_mins/len(helper), 1)}")

    return


def getTeamId(player_id):
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_dict()
    team_abbreviation  = player_info['resultSets'][0]['rowSet'][0][20]
    teams_ = teams.get_teams()
    team_id = team_abbreviation
    for team in teams_:
        if team['abbreviation'].upper() == team_abbreviation:
            team_id = team['id']
    return team_id






#Grabbing player and collecting data
player = getPlayer()
player_id = player['id']  
season = '2024-25'
team_id = getTeamId(player_id)
next_game_team_id = findNextGame(team_id)


gamelogs = playergamelogs.PlayerGameLogs(player_id_nullable=player_id, season_nullable=season)
players = commonallplayers.CommonAllPlayers().get_data_frames()[0]
helper = gamelogs.get_data_frames()[0]


last_20_games = helper.head(20)
pointsAgainstNextOpponent = gameDataAgainstOpponent(player_id, next_game_team_id)
total_mins = helper['MIN'][0:len(helper)]


helper['points_last_20'] = helper['PTS'].rolling(window=20, min_periods=1).mean().shift(1)



pointsAgainstNextOpponentOver5Years = round(sum(pointsAgainstNextOpponent)/len(pointsAgainstNextOpponent),1)



helper['min_difference'] = round(helper['MIN'] - round(total_mins/len(helper), 1),1)
helper['min_impact_on_points'] = helper.apply(
    lambda row: (row['PTS'] - helper['PTS'].mean())if row['min_difference'] > 0 else 0, axis = 1
)

helper['points_last_20'] = helper['points_last_20'] * 1000
helper['min_impact_on_points'] = helper['min_impact_on_points'] * 1.5

helper.fillna(0, inplace = True)



#PREPROCESSING PHASE
stats_to_check = helper[['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOV', 'MIN','points_last_20','min_impact_on_points']]
stat_current = helper['PTS']
train1, test1, train2,test2 = train_test_split(stats_to_check,stat_current, test_size= 0.2, shuffle= False)


# scaler = MinMaxScaler()
# train1_actual = scaler.fit_transform(train1)
# test1_actual = scaler.fit_transform(test1)


model = RandomForestRegressor(n_estimators=500,random_state=21)
model.fit(train1, train2)

prediction = model.predict(test1)
mae = mean_absolute_error(test2, prediction)
mse = mean_squared_error(test2, prediction)
r2 = r2_score(test2,prediction)


print('Random Forest Mean Absolute Error:', {mae})
print('Random Forest Mean Squared Error:', {mse})
print('Random Forest r2 Score', {r2})

plt.figure(figsize=(30,7))
plt.plot(test2.values, label = 'Actual', marker = 'o', linestyle = '-', color = 'red')
plt.plot(prediction, label = 'Prediction', marker = 'x', linestyle = '--', color = 'green')
plt.text(0.5, 10 , f'Mean Absolute Error: {mae:.2f}', fontsize=12, color='blue')
plt.text(0.5, 20 , f'Mean Squared Error: {mse:.2f}', fontsize=12, color='blue')
plt.text(0.5, 30 , f'Random Forest r2 Score: {r2:.2f}', fontsize=12, color='blue')
plt.legend()
plt.show()



residuals = test2 - prediction
plt.scatter(test2.index, residuals, color = 'blue', marker = 'o')
plt.axhline(y=0, color='black', linestyle='--')
plt.xlabel('GAMES')
plt.ylabel('RESIDUALS')
plt.legend()
plt.show()


importance = model.feature_importances_

features = stats_to_check.columns
feature_importance = pd.DataFrame({
    'Feature': features,
    'Importance': importance
})


nextGamePredictor = pd.DataFrame({
    'PTS': [helper['PTS'].mean()], 
    'REB': [helper['REB'].mean()], 
    'AST': [helper['AST'].mean()], 
    'STL': [helper['STL'].mean()], 
    'BLK': [helper['BLK'].mean()], 
    'TOV': [helper['TOV'].mean()], 
    'MIN': [helper['MIN'].mean()],
    'points_last_20': [helper['points_last_20'].mean()],
    'min_impact_on_points': [helper['min_impact_on_points'].mean()]
})



predicted_points = model.predict(nextGamePredictor)
predicted_points = predicted_points[0]



if pointsAgainstNextOpponent[0] > predicted_points:
    predicted_points = (pointsAgainstNextOpponent - predicted_points)/(pointsAgainstNextOpponent + predicted_points) * predicted_points + predicted_points
else:
    predicted_points = predicted_points - (predicted_points - pointsAgainstNextOpponent)/(pointsAgainstNextOpponent + predicted_points) * predicted_points 



predicted_points = round(predicted_points[0],2)

print({predicted_points})


