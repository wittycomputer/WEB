from flask import Flask, render_template
from flask_cors import CORS
import googleapiclient.discovery

# API 키 설정
YOUTUBE_API_KEY = ""

# Flask 애플리케이션 생성
app = Flask(__name__)
CORS(app)

def get_youtube_music_and_playlists():
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
    search_query = "신나는 R&B, KPOP"

    try:
        # YouTube API 호출
        playlist_request = youtube.search().list(part="snippet", maxResults=10, q=search_query, type="playlist")
        playlist_response = playlist_request.execute()

        music_request = youtube.search().list(part="snippet", maxResults=10, q=search_query, type="video")
        music_response = music_request.execute()

        # 음악과 플레이리스트를 하나의 리스트로 병합
        combined_results = []

        for item in music_response['items']:
            combined_results.append({
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                "title": item['snippet']['title'],
                "thumbnail": item['snippet']['thumbnails']['medium']['url'],
                "type": "music"  # 음악으로 태그 지정
            })

        for item in playlist_response['items']:
            combined_results.append({
                "url": f"https://www.youtube.com/playlist?list={item['id']['playlistId']}",
                "title": item['snippet']['title'],
                "thumbnail": item['snippet']['thumbnails']['medium']['url'],
                "type": "playlist"  # 플레이리스트로 태그 지정
            })

        return combined_results, None  # 성공적으로 데이터를 반환

    except googleapiclient.errors.HttpError as e:
        if e.resp.status == 403 and "quotaExceeded" in str(e):
            print("YouTube API quota exceeded.")
            return [], "API 모두 소진"  # 쿼터 초과 시 상태 메시지 반환
        print(f"Error fetching YouTube data: {e}")
        return [], "Error fetching YouTube data"  # 기타 에러 시 상태 메시지 반환


@app.route('/')
def home():
    combined_results, error = get_youtube_music_and_playlists()
    return render_template('index.html', combined_results=combined_results, error=error)


if __name__ == '__main__':
    app.run(debug=True)