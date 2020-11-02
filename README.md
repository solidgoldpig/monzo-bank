# monzo-bank

[![npm version](https://badge.fury.io/js/monzo-bank.svg)](https://badge.fury.io/js/monzo-bank)
[![Build status](https://api.travis-ci.org/solidgoldpig/monzo-bank.svg)](https://travis-ci.org/solidgoldpig/monzo-bank)

Node wrapper for [Monzo](https://monzo.com/) API

All current methods (as of 2 Jan 2016) implemented and can be used as promises or callback-style.

See [https://monzo.com/docs](https://monzo.com/docs)


## Version

0.1.12


## Installation

    npm install monzo-bank

Install globally, along with bundled command line tool

    npm install -g monzo-bank

If you do not wish to install the provided command line tool, you can skip the optional dependencies

    npm install -g monzo-bank --no-bin-links --no-optional


## Usage

    monzo = require('monzo-bank')

All methods return a promise but can optionally be called with a callback function as the final argument

#### Promise style

    methodPromise = monzo[$method]([$params])
    methodPromise
       .then(function(value){
         ...
       })
       .catch(function(err){
         ...
       })

#### Callback style

    monzo[method]([$params], function(err, value){
      if (err) {
       ...
      }
      ...
    })

### Methods

Acquire an access token

    tokenPromise = monzo.token({
      client_id: client_id,
      client_secret: client_secret,
      username: username,
      password: password
    })

Get information about an access token

    tokenInfoPromise = monzo.tokenInfo(accessToken)

Refresh a proviously acquired token

    refreshTokenPromise = monzo.refreshToken(refreshToken)

or if the client id and secret have not been previously passed

    refreshTokenPromise = monzo.refreshToken({
      refreshToken: refreshToken,
      client_id: client_id,
      client_secret: client_secret
    })

Get detailed information about customer’s accounts

    accountsPromise = monzo.accounts(accessToken)

Get balance details for an account

    balancePromise = monzo.balance(account_id, access_token)

List transactions

    transactionsPromise = monzo.transactions(account_id, access_token)

or to filter the results

    transactionsPromise = monzo.transactions({
      account_id: account_id,
      since: since,
      before: before
      limit: limit
    }, access_token)

Get details about a transaction

    transactionPromise = monzo.transaction(transaction_id, access_token)

or to see expanded info for the merchant

    transactionPromise = monzo.transaction({
      transaction_id: transaction_id,
      expand: 'merchant'
    }, access_token)

Annotate a transaction

    annotateTransactionPromise = monzo.annotateTransaction(transaction_id, {
      foo: 'bar'
    }, access_token)

or

    annotateTransactionPromise = monzo.annotateTransaction({
      transaction_id: transaction_id,
      foo: 'bar'
    }, access_token)

or

    annotateTransactionPromise = monzo.annotateTransaction({
      transaction_id: transaction_id,
      metadata: {
       foo: 'bar'
      }
    }, access_token)

List pots

    potsPromise = monzo.pots(account_id, access_token)

Publish a new feed entry

    createFeedItemPromise = monzo.createFeedItem({
      account_id: accountId,
      params: {
        title: title,
        image_url: image_url
      },
      url: url
    }, access_token)

Register a webhook

    registerWebhookPromise = monzo.registerWebhook(account_id, url, access_token)

See [https://monzo.com/docs/#transaction-created](https://monzo.com/docs/#transaction-created) for details of the transaction.created event which is sent to the webhook each time a new transaction is created in a user’s account

List webhooks

    webhooksPromise = monzo.webhooks(account_id, access_token)

Delete webhook

    deleteWebhookPromise = monzo.deleteWebhook(webhook_id, access_token)

Register attachment

    registerAttachmentPromise = monzo.registerAttachment({
      external_id: transaction_id,
      file_type: file_type,
      file_url: file_url
    }, access_token)

Request upload attachment url

    uploadAttachmentPromise = monzo.uploadAttachment({
      file_name: file_name,
      file_type: file_type
    }, access_token)

Deregister attachment

    deregisterAttachmentPromise = monzo.deregisterAttachment(attachment_id, access_token)


## Dev mode

Set the Monzo API host

    monzo.setHost('https://staging-api.monzo.com')


## Documentation

    npm run docs

This generates documentation with jsdoc in the docs directory (ignored by git) and also updates the README.md file.


## Command line script

If `monzo-bank` is installed with the global `-g` flag, the CLI script `monzo` will be available.

Otherwise, ensure that `bin/monzo-cli.js` is in your path.

### CLI usage

All methods are supported as commands of the CLI script.

2 additional commands are provided:

- write

  Enables writing values to config file
- deleteToken

  Deletes any saved tokens

Please refer to the built-in documentation for further details.

    monzo --help

### Bash completion

Programmable completions are provided for commands and options by the `monzo.completions.bash` file in the module’s bin directory. Either source the file directly or copy it to wherever your system looks for completion files.

### CLI config files

By default, the `monzo` cli tool looks for its config file (`monzo-cli.config.json`) in the user’s home directory.

To override this, pass the config option or set the `monzo-cli.config` environment variable.

The config file stores developer and user details, app tokens and any default values for command options.
