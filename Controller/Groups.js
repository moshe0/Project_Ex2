function Groups(){
    this.groups = [];
}

Groups.prototype={
    AddGroup:
    function AddGroup(group){
        if(this.GroupIndexOf(this.groups, group.Name) === -1) {
            this.groups.push(Object.assign({}, group));
            console.log('group: ' + group.Name + ' added!!!');
        }
        else
            console.log('The group is already exists!!!');
    },

    DeleteGroup:
     function DeleteGroup(groupName){
         var res = this.GroupIndexOf(this.groups, groupName);
         if(res > -1) {
             this.groups.splice(res, 1);
             console.log('group: ' + groupName + ' deleted!!!');
         }
         else
             console.log('The group not exists!!!');
     },

    DisplayGroups:
    function DisplayGroups (){
        for(var i=0 ; i<this.groups.length ; i++) {
            console.log(this.groups[i].Name);
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