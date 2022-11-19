// @ts-nocheck
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import oauth from 'axios-oauth-client'

const getAuthorizationCode = oauth.authorizationCode(
    axios.create(),
    "https://api.intra.42.fr", // OAuth 2.0 token endpoint
    process.env.INTRA_AUTH_UID,
    process.env.INTRA_AUTH_SECRET,
    'http://localhost:3000/' // Redirect URL for your app
  )

const AuthIntra = () => {
    const auth = getAuthorizationCode();
  return (
    <div> Auth Intra</div>
  );
};

export default AuthIntra;
