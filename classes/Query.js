class Query {
    constructor(table) {
        this.table = table;
    }
    //Fot Swagger
    SelectTreeById(id) {
        return `Select * from ${this.table} where id = ${id}`;
    }
    SelectIdByName(name) {
        return `Select id from ${this.table} where name = '${name}' order by id DESC limit 1`;
    }
    SelectAllTrees() {
        return `Select id, name, description, content from ${this.table}`
    }
    SelectAllBranches() {
        return `Select id, treeID, keys from ${this.table}`
    }
    SelectBranchByTreeID(id) {
        return `Select id, treeID, keys from ${this.table} where treeID = ${id}`
    }
    SelectUrlByBranchID(id) {
        return `Select treeID, branchID, name, annotation, link, authors, journal, journal_link from ${this.table} where branchID = ${id}`
    }
    SelectUrl() {
        return `Select treeID, branchID, name, annotation, link, authors, journal, journal_link from ${this.table}`
    }
    SelectUrlByTreeID(id) {
        return `Select treeID, branchID, name, annotation, link, authors, journal, journal_link from ${this.table} where treeID = ${id}`
    }
    InsertTree(data){
        console.log()
        return `insert into ${this.table}(name, description, content) values('${data.name}', '${data.description}', '${JSON.stringify(data.root)}');`
    }
    InsertBranch(data){
        console.log()
        return `insert into ${this.table}(treeID, keys) values ${data};`
    }
    InsertUrl(data){
        console.log()
        return `insert into ${this.table}(treeID, branchID, name, annotation, link, authors, journal, journal_link) values ${data};`
    }
    DeleteUrl(data){
        console.log()
        return `delete from ${this.table} where link like '%cyberleninka.ru%' and treeid = ${data};`
    }

    //For UI
    SelectTreeForUi(name, desc){
        console.log()
        return `select * from ${this.table} where name ilike '%${name}%' and description ilike '%${desc}%'`
    }
    SelectBranchForUi(id,keys) {
        console.log()
        return `Select * from ${this.table} where keys ilike '%${keys}%' ${id}`
    }
    SelectUrlForUi(tid,bid, treename, keys, name, auth, jour){
        console.log()
        return `select ur.treeid, ur.branchid, tr.name as treename, br.keys, ur.name, ur.annotation, ur.link, ur.authors, ur.journal, ur.journal_link 
                from urllist ur inner join anthologytree tr on (tr.id = ur.treeid)
				inner join branch br on (br.id = ur.branchid)
                where tr.name ilike '%${treename}%' and br.keys ilike '%${keys}%' and ur.name ilike '%${name}%' and ur.authors ilike '%${auth}%'and ur.journal ilike '%${jour}%' ${tid} ${bid}`
    }

}
module.exports = Query;