describe('#Testing Notes Functionality', function(){
    it('expect note to be an object', function(){
        expect(module).to.be.an('object');
    });

    it('expect function getIssueNote to exist', function(){
       expect(module.getIssueNote).to.be.a('function');
    });

    it('expect function getMeetingNote to exist', function(){
        expect(module.getMeetingNote).to.be.a('function');
    });

    it('expect function getBankNote to exist', function(){
        expect(module.getBankNote).to.be.a('function');
    });

    it('expect function getShoppingListNote to exist', function(){
        expect(module.getShoppingListNote).to.be.a('function');
    });

    it('expect function getProduct to exist', function(){
        expect(module.getProduct).to.be.a('function');
    });

    it('expect function getIssueNote to return object with title, content, issue properties!', function(){
        var item = module.getIssueNote('test', 'test', 'test');
        expect(item).to.contain.all.keys(['_title', '_content', '_issue']);
    });

    it('expect function getBankNote to return object with title, content, amount properties!', function(){
        var item = module.getBankNote('test', 'test', 200);
        expect(item).to.contain.all.keys(['_title', '_content', '_amount']);
    });

    it('expect function getMeetingNote to return object with title, content, place, hour properties!', function(){
        var item = module.getMeetingNote('test', 'test', 'test', 24);
        expect(item).to.contain.all.keys(['_title', '_content', '_place', '_hour']);
    });

    it('expect function getShoppingListNote to return object with title, content properties!', function(){
        var item = module.getShoppingListNote('test', 'test');
        console.log(item);
        expect(item).to.contain.all.keys(['_title', '_content']);
    });

    it('expect function getProduct to return object with name!', function(){
        var item = module.getProduct('test');
        expect(item).to.contain.all.keys(['_name']);
    });


});