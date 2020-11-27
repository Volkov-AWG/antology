class Query {
    constructor(table) {
        this.table = table;
    }

    SelectTreeById(id) {
        return `Select content from ${this.table} where id = ${id}`;
    }
    SelectAllTrees() {
        return `Select id, name, content from ${this.table}`
    }
    InsertTree(data){
        console.log()
        return `insert into ${this.table}(name, content, description) values('${data.name}','${JSON.stringify(data.content)}', '');`
    }
}
module.exports = Query;