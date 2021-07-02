class Query {
    constructor(table) {
        this.table = table;
    }

    SelectTreeById(id) {
        return `Select content from ${this.table} where id = ${id}`;
    }
    SelectIdByName(name) {
        return `Select id from ${this.table} where name = '${name}' order by id DESC limit 1`;
    }
    SelectAllTrees() {
        return `Select id, name, content from ${this.table}`
    }
    SelectAllBranches() {
        return `Select id, treeID, keys from ${this.table}`
    }
    SelectBranchByTreeID(id) {
        return `Select id, treeID, keys from ${this.table} where treeID = ${id}`
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
}
module.exports = Query;