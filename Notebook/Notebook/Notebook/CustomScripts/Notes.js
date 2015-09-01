var module = (function () {
    var MIN_LENGTH = 3,
        MAX_LENGTH = 25,
        MAX_CONTENT_LENGTH = 300;
       

    function validateString(value) {
        if (value === undefined) {
            throw new Error("String is undefined");
        }
        if (typeof value !== 'string') {
            throw new Error('Value is not a string');
        }       
    }
   
    function validateContentLength(value) {
        if (value.length > MAX_CONTENT_LENGTH) {
            throw new Error("Not valid content length")
        }
    }

    function validateLength(value, text) {
        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
            throw new Error("Not valid "+ text +" text length")
        }
    }

    function validateIsUndefined(value) {
        if (value === undefined) {
            throw new Error('Value is undefined');
        }
    }

    function validateIsNumber(value) {
        if (typeof value !== 'number') {
            throw new Error('Value is not a number');
        }
    }

    function validateID(id) {
        validateIsUndefined(id);
        if (typeof id !== 'number') {
            id = id.id;
        }

        validateIsUndefined(id);
        return id;
    }

   var Note = (function () {
        var id = 0;
        var Note = {};
        Object.defineProperties(Note, {
            init: {
                value: function (title, content) {
                    this._id = ++id;                   
                    this.title = title;
                    this.content = content;
                    return this;
                }
            },
            id: {
                get: function () {
                    return this._id;
                }
            },
            title: {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    validateString(value);
                    validateLength(value, "title");
                    this._title = value;
                }
            },
            content: {
                get: function () {
                    return this._content;
                },
                set: function (value) {
                    validateString(value);
                    validateContentLength(value);
                    this._content = value;
                }
            }          
        })
        return Note;
    }());

    var IssueNote = (function (parent) {
        var IssueNote = Object.create(parent);

        Object.defineProperties(IssueNote, {
            init: {
                value: function (title, content, issue) {
                    parent.init.call(this, title, content);
                    this.issue = issue;
                    return this;
                }
            },
            issue: {
                get: function () {
                    return this._issue;
                },
                set: function (value) {
                    validateString(value);
                    validateLength(value, 'issue');
                    this._issue = value;
                }
            }          
        });
        return IssueNote;
    }(Note));

    var MeetingNote = (function (parent) {
        var MeetingNote = Object.create(parent);
        Object.defineProperties(MeetingNote, {
            init: {
                value: function (title, content, place, hour) {
                    parent.init.call(this, title, content);
                    this.place = place;
                    this.hour = hour;
                    return this;
                }
            },
            place: {
                get: function () {
                    return this._place;
                },
                set: function (value) {
                    validateString(value);
                    validateLength(value, 'place');
                    this._place = value;
                }
            },
            hour: {
                get: function () {
                    return this._hour
                },
                set: function (value) {
                    this._hour = value;
                }
            }
          
        });
        return MeetingNote;
    }(Note))

    var BankNote = (function(parent){
        var BankNote = Object.create(parent);
        Object.defineProperties(BankNote, {
            init: {
                value: function (title, content, amount) {
                    parent.init.call(this, title, content);
                    this.amount = amount;
                    return this;
                }
            },
            amount: {
                get: function () {
                    return this._amount
                },
                set: function (value) {
                    validateIsUndefined(value);
                    // validateIsNumber(value);
                    this._amount = value;
                }
            }
        });
        return BankNote;
    }(Note))

    var ShoppingListNote = (function (parent) {
        var ShoppingListNote = Object.create(parent);
        Object.defineProperties(ShoppingListNote, {
            init: {
                value: function (title, content, products) {
                    parent.init.call(this, title, content);
                    this._collectionOfProducts = [];
                    return this;
                }
            },
            addProductToShoppingList: {
                value: function (product) {
                    validateIsUndefined(product);                   
                    this._collectionOfProducts.push(product);
                    return this;
                }
            },
            removeProductFromShoppingList: {
                value: function (product) {
                    var isPresent = false, currentID;
                    currentID = validateID(product.id);
                    for (var i = 0, numberOfProductsInList = this._collectionOfProducts.length; i < numberOfProductsInList; i += 1) {
                        if (this._collectionOfProducts[i].id === currentID) {
                            this._collectionOfProducts.splice(i, 1);
                            numberOfProductsInList = numberOfProductsInList - 1;
                            isPresent = true;
                            return this._collectionOfProducts;
                        }
                    }

                    if (isPresent === false) {
                        throw new Error('No such product')
                    }
                }
            },
        })
        return ShoppingListNote;
    }(Note))

    var Product = (function () {
        var id = 0;
        var Product = {};
        Object.defineProperties(Product, {
            init: {
                value: function (name) {
                    this._id = ++id;                  
                    this.name = name;                 
                    return this;
                }
            },
            id: {
                get: function () {
                    return this._id;
                }
            },
            name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    validateString(value);
                    validateLength(value, "name");
                    this._name = value;
                }
            },          
        })
        return Product;
    }());


    return {        
        getIssueNote: function (title, content, issue) {
            return Object.create(IssueNote).init(title, content, issue);
        },
        getMeetingNote: function (title, content, place, hour) {
            return Object.create(MeetingNote).init(title, content, place, hour);
        },
        getBankNote: function (title, content, money) {
            return Object.create(BankNote).init(title, content, money);
        },
        getShoppingListNote: function (title, content) {
            return Object.create(ShoppingListNote).init(title, content);
        },
        getProduct: function (name) {
        return Object.create(Product).init(name);
        },
    };
}());

