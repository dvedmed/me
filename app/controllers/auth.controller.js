const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var randtoken = require('rand-token');

var admin = require("firebase-admin");

let defaultAppConfig = {
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "goalachiever-15e78",
        "private_key_id": "5c5dc3cb0a0fdcb2e07e46f102ced3e65aee9879",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCv/pV37kkyn1Lu\n05wXRtwTzyzbH928f/ggJxJzLz8QGGk0EQ/+rTPA9NV3dHVINJ43e4hRhhaqhZjP\ngYLNNvtQt2PyYZ59+a+YwfeNDX19AK9K45654ZnaPE+C1jJwE1JRmzBoU1Sun/6o\nuv+GM7iwds3zzZyU4D+9vZKZLw1fdQG6NRVJx00UHhdQjZffPe2BDVHcTKSQ5zW6\nZhx2LnJhb6xMOm3mDX+ktMoQPq10uT9Z35qe7EOPirzJSG0A9v8Hoyf7TefWC4et\nYlG/UFjctkCqUfCLEdznxeTRA2HYAiYSsjaoCz45NY+0EOZ8MnN/nLW926LL5wMc\nz1sZUxE3AgMBAAECggEAQ+oQL8mqQXit/i92ipzzjElkW+K+JGGVlIK/YeeXhFSH\nNGppK7QWxp00SvaL06NKcsqe3ibKVF9diqXFnf9bl9hNH1mAWciidGZVav8Lr9M1\n0cZol/5w6oBfhnO13v31xDwIwBl4EjL3iJEwzc7jtGUEMNLlW6X1sviWu7omhPD0\nA5ny+rBCXGbn98+6jNnI1MfDkFU6itfXK5MnopqkANcN/O7MhDDY+80+OELRiVEz\nIrGEMUQ0TVlOVlnqPTCgRswFyD8TJKUunm3XbvZ92M4RlVvlCkd3QILIJNGAQ/QX\nmGqMgEThX9//ll9Bbh1ktUyjwNxzcDcjC93o7iTGoQKBgQDfT+LHuWw+VzGPP+RI\nIEz+6vgXthRB0pD5bl7rP15nUuVodItL1oQAnAIGNGUajMJD9IUeHKPXbIOURKMr\n4f/ffTp+ZN7iuzbqKRbbbXSSHgP2/l78fZQRiTW4XJy2ItEYKXW0xPppZPqPUgpx\nd6vPfDlBdYwfvndIsasfB/CMbwKBgQDJwZQYB3xkBi2oC5AKuWkr0nfbqgdISEiR\n5kCdkZGkN3cQcLBk0bb+1ceJUJfcMTRMzYIY3+R5+ALPCbwQj9fzeQkURuG8NG/2\nvbnCWjhzUl2O0I68W0SlpyRH1IdV37PscNETyRj0ChbEor2OaVamvUQQRsUXvxT0\n1fxdJeA7uQKBgQCnzUGdzsl1ttN4zwvc3ti8nRe7yYhDRdTGeZc9sqpffb0A1sJt\nRE6Anrouq2RlpOu9YJo+3EqJb/MXkNQD/5jj+RfhLi8FtKQ5JJMWY5M60O8txErf\n9AU1gCMr2/uuKU9xloXqRjHczJIy6/UI+mHSUYg8lfWrTNYZe9gYQ0EQZQKBgEPc\nC06lve36sgKSmQkyYbBuowfMQZTLUzVXh6Y33w+n5DEwZfQTIYTHLMz/wYQ7PIcU\nnEx3ieaIR5GRiaLcbtsie65JRQXDcWFBYSiApfoL2xH9DfVGkWlSNX6/eiGlE2RU\ncc5A1lbGye+reSxcO9vrTuhWlVYuXAMZsj82TRxpAoGAWk72uCxZcqxMr4RhSiaE\n05HtUIs27kXd5YIwj5Y2gvFn8ZZnTuqk740KHT3mh+QgJ667o2LgmAvPdXLcG3X/\nv35IjKm8U/GqQJkIIFqJYHW13pEu87dE9fTNz51aNuXNBT7Rr4YlZ8EmuCs2Ne3S\n46weLLDeIU8gQbrL0LULuLk=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-zgij8@goalachiever-15e78.iam.gserviceaccount.com",
        "client_id": "110556391171751666009",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zgij8%40goalachiever-15e78.iam.gserviceaccount.com"
    }),
    databaseURL: "https://goalachiever-15e78.firebaseio.com"
};

admin.initializeApp(defaultAppConfig);

const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVlOWVlOTdjODQwZjk3ZTAyNTM2ODhhM2I3ZTk0NDczZTUyOGE3YjUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRG1pdHJ5IFZlZG1lZCIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8yMDM5NjM3NjA5Nzc5MzcvcGljdHVyZSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9nb2FsYWNoaWV2ZXItMTVlNzgiLCJhdWQiOiJnb2FsYWNoaWV2ZXItMTVlNzgiLCJhdXRoX3RpbWUiOjE1ODc4MTQwODEsInVzZXJfaWQiOiJ4WWVId25JUzg4Y2NWVEUxMGZHZ1ZqVjFqWTIzIiwic3ViIjoieFllSHduSVM4OGNjVlRFMTBmR2dWalYxalkyMyIsImlhdCI6MTU4NzgxNDA4MywiZXhwIjoxNTg3ODE3NjgzLCJlbWFpbCI6InZlZG1pdHJ5N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjIwMzk2Mzc2MDk3NzkzNyJdLCJlbWFpbCI6WyJ2ZWRtaXRyeTdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZmFjZWJvb2suY29tIn19.iO0lsVY3F44EfZteamjY8YunSiZDXDOKDJoObFztfYLz8zpByk56xVc98FBx0nsKkOwZLPDr3GeE4qPVXQPVEEVqI6C1bCQ9PfkDUbmnirXMWMuJdTobLYS-HnoYbw0EcTDg3SaEMMh3NHIj7EYdD4rM7mTUWP31KevGSaBmP1RNVXUqBl7O3MXtE8OMZeZsobI66QJh5J4RG1pqKFuA7jtlFEt90pW20MC833TkoILoy2YgMrhVoBb6R9pcCCBZJSYHauiTeNOFBk7-5OPnCl4fGYK0aC2xvycf5tI7VfRn-X6pccxIxUw3uI3US0UMJnLlGM0YtV11t2vkBGxsuA";
const idToken2 = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRG1pdHJ5IFZlZG1lZCIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLVNJQ2VtazZHN1I4L0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FLRjA1bkRUSW95ekVRR1JXazRKLVBNTTVyZGk5dUhVY0Evczk2LWMvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2dvYWxhY2hpZXZlci0xNWU3OCIsImF1ZCI6ImdvYWxhY2hpZXZlci0xNWU3OCIsImF1dGhfdGltZSI6MTU4MzA5Njg3MSwidXNlcl9pZCI6Ik9yU3lnQnFkb3hTTGxGb0FpM1VSTUdFUDFTMzMiLCJzdWIiOiJPclN5Z0JxZG94U0xsRm9BaTNVUk1HRVAxUzMzIiwiaWF0IjoxNTgzMDk2ODcxLCJleHAiOjE1ODMxMDA0NzEsImVtYWlsIjoidmVkbWl0cnk3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEzODIxNTQ0NzUzODM4MTAxNDA1Il0sImVtYWlsIjpbInZlZG1pdHJ5N0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.NUyB3g2UuPFlDH1wR2c3HIru0nyHFEDmm4C0sbkGxrEtgcMD2AhLjsBjH8bh1pD641xSp2uCq-SiL1wN9Tt123ryc8cK8FpKyA76xTJJNBSCMAsdXjDCCC2p2yfhgAaBYPK_WRsnR3FKcxZWvn6zn4QWfghj8ABeFcaz_7ujalMGGfXXW5zRhilFbySG9cUep8tXZZd1Cx0L2ovm-2fjm7C4xrgJWUIK5pXuV3uCgRvAgxsSmasZ1ChKT0SmT8blW7_RPhFY6xUCMb7M3JAz8E4LWKO0B6Rztb0bXr7SP5wj2VUuKNGw243Z-u0qbH4dY48J8ZkKlWP99JaR5ruSKQ"

exports.authorize = (req, res) => {

    console.log(req.body.id_token);
    admin.auth().verifyIdToken(req.body.id_token)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;//OrSygBqdoxSLlFoAi3URMGEP1S33
            console.log("UID - " + uid);
            admin.auth().getUser(uid)
                .then(function(userRecord) {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('Successfully fetched user data:', userRecord.toJSON());
                    console.log('UID :', userRecord.uid);
                    User.findOne({
                        where: {
                            uid: userRecord.uid
                        }
                    }).then(user => {
                        if (!user) {
                            //TODO Create user and Return token
                            User.create({
                                username: userRecord.displayName,
                                email: userRecord.email,
                                uid: userRecord.uid,
                                image: userRecord.photoURL
                            })
                                .then(user => {
                                    const token = jwt.sign({id: user.id}, config.secret, {
                                        expiresIn: config.tokenLife // 24 hours
                                    });
                                    const refreshToken = randtoken.uid(56);

                                    user.update( { refreshToken: refreshToken } );
                                    console.log("refreshToken - " + refreshToken);
                                    res.status(200).send({
                                        id: user.id,
                                        username: user.name,
                                        email: user.email,
                                        accessToken: token,
                                        refreshToken: refreshToken,
                                        image: user.image
                                    });
                                })
                                .catch(err => {
                                    res.status(500).send({ message: err.message });
                                });

                        } else {
                            //TODO Return token
                            console.log('USER exist');
                            console.log('USER record url ' + userRecord.photoURL);
                            console.log('USER url ' + user.image);
                            const token = jwt.sign({id: user.id}, config.secret, {
                                expiresIn: config.tokenLife // 24 hours
                            });
                            const refreshToken = randtoken.uid(56);

                            user.update( { refreshToken: refreshToken } );
                            console.log("refreshToken - " + refreshToken);
                            res.status(200).send({
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                accessToken: token,
                                refreshToken: refreshToken,
                                image: user.image
                            });
                        }
                    });
                })
                .catch(function(error) {
                    console.log('Error fetching user data:', error);

                });
            // ...
        }).catch(function(error) {
        console.log("UID - fuck"  )
        res.status(421).send({
            id: 24,
            username: 'Error fetching user data: ' + error.toString(),
        });
        // Handle error
    });
    //   res.status(200).send({authorize: "authorize"})
};

exports.testAuthorize = (req, res) => {

    //auth by email
    console.log(req.body.email);

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            // Create user and Return token
            User.create({
                username: "Vasili",
                email: req.body.email,
                uid: 0,
                image: "https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
            })
                .then(user => {
                    const token = jwt.sign({id: user.id}, config.secret, {
                        expiresIn: config.tokenLife // 24 hours
                    });
                    const refreshToken = randtoken.uid(56);

                    user.update( { refreshToken: refreshToken } );
                    console.log("refreshToken - " + refreshToken);
                    res.status(200).send({
                        id: user.id,
                        username: user.name,
                        email: user.email,
                        accessToken: token,
                        refreshToken: refreshToken,
                        image: user.image
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        } else {

            //Return token

            console.log('USER exist');
            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: config.tokenLife // 24 hours
            });
            const refreshToken = randtoken.uid(56);

            user.update( { refreshToken: refreshToken } );
            console.log("refreshToken - " + refreshToken);
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,
                refreshToken: refreshToken,
                image: user.image
            });
        }
    });

};

exports.me = function(req,res){
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, secret.secretToken);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id
        User.findOne({_id: userId}).then(function(user){
            // Do something with the user
            return res.send(200);
        });
    }
    return res.send(500);
};