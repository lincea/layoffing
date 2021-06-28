var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("hxdata.db");

exports.initDB = function () {
    db.serialize(function () {
        db.run(`create table if not exists users(
            id integer primary key autoincrement,
            created_at long,
            last_modified_at long, 
            status integer, 
            uuid string, 
            name text not null, 
            date_of_birth long, 
            date_of_death long, 
            gender integer, 
            password text, 
            email_address text, 
            home_telephone_number text, 
            work_telephone_number text, 
            mobile_phone_number text, 
            avatar_url text)`);
    });
};

exports.getUsers = function (action) {
    db.each(
        `select id as id, created_at as createdAt, last_modified_at as lastModifiedAt, status, uuid, 
            name, date_of_birth as dateOfBirth, date_of_death as dateOfDeath, gender, password, email_address as emailAddress,
            home_telephone_number as homeTelephoneNumber, work_telephone_number as workTelephoneNumber,
            mobile_phone_number as mobilePhoneNumber, avatar_url as avatarUrl from users`,
        (err, row) => {
            if (err) {
                action(null);
            }
            action(row);
        }
    );
};

exports.getUserCount = function () {
    return new Promise(function (resolve, reject) {
        db.get("select count(*) as count from users", (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
};

exports.getUsersInPage = function (pageSize, pageOffset) {
    return new Promise((resolve, reject) => {
        db.serialize(function () {
            db.all(
                `select id as id, created_at as createdAt, last_modified_at as lastModifiedAt, status, uuid, 
            name, date_of_birth as dateOfBirth, date_of_death as dateOfDeath, gender, password, email_address as emailAddress,
            home_telephone_number as homeTelephoneNumber, work_telephone_number as workTelephoneNumber,
            mobile_phone_number as mobilePhoneNumber, avatar_url as avatarUrl from users limit ${pageSize} offset ${
                    pageSize * pageOffset
                }`,
                (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(rows);
                }
            );
        });
    });
};

exports.createUser = function (user) {
    if (!user) {
        return;
    }

    if (!user.name) {
        return;
    }

    user.createdAt = Date.now();
    user.lastModifiedAt = user.createdAt;
    user.status = 0;

    db.serialize(function () {
        let stmt =
            db.prepare(`insert into users(created_at, last_modified_at, status, uuid,
            name, date_of_birth, date_of_death, gender, password, email_address,
            home_telephone_number, work_telephone_number, mobile_phone_number,
            avatar_url) 
            values($createdAt, $lastModifiedAt, $status, $uuid,
                $name, $dateOfBirth, $dateOfDeath, $gender, $password, $emailAddress,
                $homeTelephoneNumber, $workTelephoneNumber, $mobilePhoneNumber,
                $avatarUrl)`);
        stmt.run({
            $createdAt: user.createdAt,
            $lastModifiedAt: user.lastModifiedAt,
            $status: user.status,
            $uuid: user.uuid,
            $name: user.name,
            $dateOfBirth: user.dateOfBirth,
            $dateOfDeath: user.dateOfDeath,
            $gender: user.gender,
            $password: user.password,
            $emailAddress: user.emailAddress,
            $homeTelephoneNumber: user.homeTelephoneNumber,
            $workTelephoneNumber: user.workTelephoneNumber,
            $mobilePhoneNumber: user.mobilePhoneNumber,
            $avatarUrl: user.avatarUrl,
        });

        stmt.finalize();
    });
};
