import requests
from bs4 import BeautifulSoup
import datetime
import csv
import time

def fetch_weather_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        print(f"Failed to fetch data from {url}. Status code: {response.status_code}")
        return None

def get_weather_data(city="dubai"):
    current_date = datetime.datetime.now()
    start_date = current_date.replace(day=1)
    current_day = current_date.day
    weather_data = []

    for day in range(1, current_day + 1):
        date = start_date.replace(day=day)
        date_str = date.strftime('%Y-%m-%d')
        url = f"https://www.timeanddate.com/weather/united-arab-emirates/{city}/historic?month={date.month}&year={date.year}&hd={date_str}"

        print(f"Fetching data for {date_str} from {url}")

        retries = 3
        while retries > 0:
            content = fetch_weather_data(url)
            if content:
                soup = BeautifulSoup(content, 'html.parser')
                weather_table = soup.find('table', attrs={'id': 'wt-his'})
                if weather_table:
                    rows = weather_table.find_all('tr')
                    for row in rows[1:]:
                        cols = row.find_all('td')
                        if len(cols) >= 3:
                            time_val = cols[0].text.strip()
                            temp_val = cols[1].text.strip()
                            desc_val = cols[2].text.strip()
                            weather_data.append({
                                'date': date_str,
                                'time': time_val,
                                'temperature': temp_val,
                                'description': desc_val
                            })
                    break
                else:
                    print(f"No weather table found for {date_str}")
                    break
            else:
                retries -= 1
                time.sleep(5)  # Wait before retrying

        if retries == 0:
            print(f"Failed to fetch data for {date_str} after multiple retries")

    return weather_data

weather_data = get_weather_data()

# Print or save weather data as needed
if weather_data:
    print("Weather data collected:")
    for entry in weather_data:
        print(f"Date: {entry['date']}, Time: {entry['time']}, Temperature: {entry['temperature']}, Description: {entry['description']}")
else:
    print("No weather data collected.")
