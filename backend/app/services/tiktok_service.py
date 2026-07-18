import urllib.parse

from flask import current_app


class TikTokService:

    @staticmethod
    def authorization_url():

        params = {

            "client_key": current_app.config["TIKTOK_CLIENT_KEY"],

            "response_type": "code",

            "scope": "user.info.basic,video.upload",

            "redirect_uri": current_app.config["TIKTOK_REDIRECT_URI"],

            "state": "creatordesk"

        }

        return (

            "https://www.tiktok.com/v2/auth/authorize/?"

            + urllib.parse.urlencode(params)

        )