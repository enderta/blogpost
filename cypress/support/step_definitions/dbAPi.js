/* global Cypress, cy */
import {Given, Then} from '@badeball/cypress-cucumber-preprocessor'
import {numberofpostsUI} from "./home.js"
///<reference types="cypress"/>
import {numberofpostsAPI} from "./CrudApi.js"
import {numberofPostsDB} from "./db.js"


Then('The results should be the same', () => {

        expect(numberofpostsAPI).to.equal(numberofPostsDB);

    })