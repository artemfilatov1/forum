import React, {useEffect} from "react";
import {sendVerifyEmail} from "../../redux/modules/auth";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Redirect} from "react-router-dom";
import * as r from "react";

function verify() {
    const dispatch = rr.useDispatch();
    const user = rr.useSelector(state => state.auth);
    const { token } = rd.useParams();

    r.useEffect(() => {
        dispatch(sendVerifyEmail(token))
    },[])

    const ok = (
        <div>
            <h2>Verify account</h2>
        </div>
    );
    const fali = (
        <div>
            <h2>Fail verify account</h2>
        </div>
    );

    return (
        <div>
            {user.error && <Redirect to="/404" />}
            {!user.error && ok}
        </div>
    )
}

export default verify;
