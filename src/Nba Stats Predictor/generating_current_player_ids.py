from nba_api.stats.endpoints import playergamelogs
from nba_api.stats.endpoints import commonallplayers
from nba_api.stats.endpoints import playerawards
from nba_api.stats.static import players


def find_closest_active(name): 
    player = players.find_players_by_full_name(name)
    active_players = [player for player in player if player.get('is_active')]
    if active_players:
        player_helper_main = active_players[0]
        helper = playerawards.PlayerAwards(player_helper_main['id'])
        max_awards = len(helper.get_data_frames()[0])
        for player_helper in active_players:
            awards = playerawards.PlayerAwards(player_helper['id'])
            helper_two = len(awards.get_data_frames()[0])
            if (helper_two > max_awards):
                player_helper_main = player_helper
                max_awards = helper_two
        return player_helper_main
    elif player:
        player_helper_main = player[0]
        helper = playerawards.PlayerAwards(player_helper_main['id'])
        max_awards = len(helper.get_data_frames()[0])
        for player_helper in player:
            awards = playerawards.PlayerAwards(player_helper['id'])
            helper_two = len(awards.get_data_frames()[0])
            if (helper_two > max_awards):
                player_helper_main = player_helper
                max_awards = helper_two
        return player_helper_main
    return None


#Able to take in first name or last name and pumps the value into finding the player
#In a case where multiple players have the name it comes up with the first one that exists
#It then goes through and priortizes whoever is currently active
    #The thought process is that people are going to be more interested in how people now are playing and be able to use the stats in a useful way
#If no active player is found it just goes back to the original value


#NOW priortizes first active players, then the player with the most accolades 


#Current next steps:
#1. Have it push for players with higher stats first
    # The thinking behind this is that people are more likely interested in stars rather than people off the bench
#2. Start using a machine learning model to have it learn from their previous tendencies

def getPlayer():
    while True:
        name = input("Enter player name: ").strip() 
        players_ = commonallplayers.CommonAllPlayers().get_data_frames()[0]
        player = players.find_players_by_full_name(name)
        if len(name) >= 3:
            if player:
                player = players.find_players_by_full_name(name)[0]
                if player['is_active']:
                    awards = playerawards.PlayerAwards(player['id'])
                    break
                else:
                    player = find_closest_active(name)
                    if player['is_active']:
                        break
                    else:
                        print("Not a current player try again") 
            else:
                print("No player found try again")
        else:
            print("Please input at least 3 letters")
    return player




