_Visit live demo at https://dabble.surge.sh/_

# Component and flow of Application

### For a new User
* connect metamask of user to the site
* allow user to create transactions on matic network
* Dashboard consists of a list of books being written on the platform
* New user is able to
    * Read other books
    * Write a new Book

### While writing a book
* User can write a chapter of a new Book or
* User can continue writing new chapters for an existing book
* Whenever a new chapter is uploaded, user puts some eth on stake for that chapter.
* For the chapter being uploaded, Author is allowed to create polls with binary answer
* All readers who read the chapter get 5% of the Author's stake amount


### About Polls by Author
* Readers are allowed to take part in poll by putting their a part of their stake.
* Voters who were in minority, would loose theior staked amount.
* Voters who secured majority, will recive rewards
    *  Rewardpool comprise of: All the staked amount by readers+ 95% of the Author's stake
    *  Every voter in winning pool gets rewards in proportions to their staked amount.

### While reading books:
* User selects a book, and a list of chapters of that book is displayed
* User selects a chapter, and chapter content is displayed.
* User can finish reading and not take part in polls.
* User can decide to participate in poll and put stake on any option.
* Upon finishing reading, user can submit a transaction to indicate that reading was completed.
* To paeticipate in poll, user can submit a transaction, indicating the vote and the stake.

### When Polling period ends for a chapter
* 5% of Author's stake is eligible to be claimed by all readers.
* All readers are eligible to claim their share from 5% of the Author's stake.
* All readers and voters are eligible to initiate disbursal of Poll rewards.


# Spec Sheet - Dable
==

Actors:
* Writer
* Reader


Incentives:
* Writer:
    * Wants feedback on their book.
    * Cheaper/Shorter feedback loops.
        * Compared to traditional publishing that takes 6 - 8 months per book.

* Reader:
    * Wants to support authors writing good content because itna bad context exists on the market.
    * Wants to earn money for giving feedback.
    * Reading is dying habit.


## States:
* State 0 - Process at every new chapter
    * Click on creating a new article.
        * Spec sheet Article:
            * Variable:
                * Name
                * Content
                * Amount staked - skin in the game.
                * Question for followup:
                    * Option is binary.
            * Hard constraint:
                * 48 hours of outcome.
* State 0 - 1: Article created
* State 1:
    * For 48 hours things that are happening:
        * Readers are reading.
        * Readers are voting on followup:
            * Stake:
                * Min
                    * Spam prevention
                * Max
                    * Whale prevention




## Game Theory

* Writer - by staking amount, they increase the possiblity of their article getting read.

* Chapter:
    * 5% reward is split for reading.
        * Bot prevention:
            * Captcha
    * 95% reward is split for incentive on feedback.




Example:

### Case 1: Voting is not tied

* Author stakes $100.
* Readers:
    *  Read: 10
    *  Vote: 5
        *  Metrics:
            *  3 - true
            *  2 - false
        *  Resolved: true wins.

* Final incentive disbursal:
    * Every reader get's: $5/10 = $0.5
    * Every reader who voted and won:
        * Winning pool comprises of:
            * 95% of author's stake = $95
            * Total stake of the voting pool
        * Disbursement to winners:
            * Based on their ~ in the winning stake.

### Case 2: Voting is tied

* Author stakes $100.
* Readers:
    *  Read: 10
    *  Vote: 5
        *  Metrics:
            *  2 - true
            *  2 - false
        *  Resolved: true wins.

* Final incentive disbursal:
    * Every reader get's: $5/10 = $0.5
    * Tie breaker:
        * Author votes.
    * Pool that won from author's vote:
        * Winning pool comprises of:
            * 95% of author's stake = $95
            * Total stake of the voting pool
        * Disbursement to winners:
            * Based on their ~ in the winning stake.



Game theory possible use cases:
* Writers with more stake get more feedback in general.
    * Though more feedback from reader's perspective dilutes their reading incentive:
        * More people read, more their reading incentives dilute.
            * And hence the incentive would be to vote.
        * More people vote, the odds become more volatile.

* Writers with less stake are automatically more desirable given the above game theory:
    * Less readers read, less their reading dilution.
    * And hence when readers enter voting, the odds become more even.

## Setting up Project

#### Prerequisites
* nodejs
* npm

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!

