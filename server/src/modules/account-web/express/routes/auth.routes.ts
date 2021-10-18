
const { Router } = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

import { AccountEntity } from "../../../../domains/entities/account.entity";
import { FriendWindowEntity } from "../../../../domains/entities/friend-window.entity";

import { AccountPersistenceAdapterService } from "../../../account-persistence/account-persistence-adapter.service";
import { AccountMysqlEntity } from "../../../account-persistence/account.mysql-entity";
import { FriendMysqlEntity } from "../../../account-persistence/friend.mysql-entity";

import { CreateAccountCommand } from "../../../../domains/ports/in/create-account.command";
import { CreateAccountService } from "../../../../domains/services/create-account.service";
import { JWT_SECRET } from "../../../../../constants";
import { GetAccountService } from "../../../../domains/services/get-account.service";

const router = Router();

router.get("/ping", async (req: any, res: any) => {
    res.json({ ping: "pong" });
})

router.post(
    '/register',
    [
        check('email', 'Bad email').isEmail(),
        check('password', 'min password length')
            .isLength({ min: 6 })
    ],
    async (req: any, res: any) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Bad email or password'
                })
            }

            const { email, password, name, last_name, birthdate, gender, interests, city } = req.body;

            const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
                AccountMysqlEntity.getInstance(),
                FriendMysqlEntity.getInstance()
            );

            const createAccountService = new CreateAccountService(
                accountPersistenceAdapterService,
                accountPersistenceAdapterService
            )

            const hashedPassword = await bcrypt.hash(password, 12);
            const friendWindow = new FriendWindowEntity();
            const account = new AccountEntity(
                email,
                hashedPassword,
                name,
                last_name,
                birthdate,
                gender,
                interests,
                city,
                friendWindow
            );

            await createAccountService.createAccount(new CreateAccountCommand(account));
            res.status(201).json({ message: 'User created' });

        } catch (error) {
            res.status(500).json({
                message: 'Registration failed. Something went wrong, try again later',
                error
            });
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Wrong password').exists()
    ],
    async (req: any, res: any) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Login failure. Bad email or password'
                })
            }
            const { email, password } = req.body

            const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
                AccountMysqlEntity.getInstance(),
                FriendMysqlEntity.getInstance()
            );

            const account = await new GetAccountService(accountPersistenceAdapterService).getAccount(email);

            if (!account) {
                return res.status(400).json({ message: "Account not found" })
            }
            const isMatch = await bcrypt.compare(password, account.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password' })
            }

            const token = jwt.sign(
                { accountId: account.id },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ token, accountId: account.id });
        } catch (e) {
            res.status(500).json({ message: 'Login failed. Something went wrong, try again later' })
        }
    });

module.exports = router;