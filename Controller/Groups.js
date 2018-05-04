function Groups(){
    this.nTree = null;
}

Groups.prototype={
    AddGroup:
    function AddGroup(group){
        if(this.GroupIndexOf(this.nTree, group.Name) === -1) {
            this.nTree.push(Object.assign({}, group));
            console.log('group: ' + group.Name + ' added!!!');
        }
        else
            console.log('The group is already exists!!!');
    },

    DeleteGroup:
     function DeleteGroup(groupName){
         var res = this.GroupIndexOf(this.nTree, groupName);
         if(res > -1) {
             this.nTree.splice(res, 1);
             console.log('group: ' + groupName + ' deleted!!!');
         }
         else
             console.log('The group not exists!!!');
     },

    DisplayGroups:
    function DisplayGroups (){
        for(var i=0 ; i<this.nTree.length ; i++) {
            console.log(this.nTree[i].Name);
        }
    },

    GroupIndexOf:
    function GroupIndexOf(groupArray ,groupName){
        for(var i=0 ; i<groupArray.length ; i++){
            if(groupArray[i].Name === groupName){
                return i;
            }
        }
        return -1;
    }
};


module.exports = Groups;