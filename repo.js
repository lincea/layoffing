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
