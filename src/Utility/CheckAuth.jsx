import { redirect } from "react-router-dom";

export function isLogin() {

    let token = localStorage.getItem('YoutubeToken');

    if (!token) {
        return redirect('/login')
    }
    else {
        return null;
    }

}