/* global Cypress, cy */
///<reference types="cypress"/>
import {Given, Then} from '@badeball/cypress-cucumber-preprocessor'
import {numberofpostsUI} from "./home.js"
import {numberofpostsAPI} from "./CrudApi.js"
import {numberofPostsDB} from "./db.js"

Then('The results from the UI, API and database should be the same', () => {

        expect(numberofpostsAPI).to.equal(numberofPostsDB);
        expect(numberofpostsAPI).to.equal(numberofpostsUI);
        expect(numberofpostsUI).to.equal(numberofPostsDB);

})