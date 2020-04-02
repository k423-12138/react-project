

let name = 'test'
// let arr = [{ id: 'k43', name: '大哥' }, { id: 'k24', name: '大哥' }, { id: 'k23', name: '大哥' },]


// let list_name = [{ id: 1, name: '大哥',wages:100000 }, { id: 2, name: '人才',wages:100000  }, { id: 3, name: '巫女',wages:100000  }, { id: 4, name: '香蕉',wages:100000  }]

// export let zhiWei = function (state = [], action) {
//         console.log(action.type);

//         switch (action.type) {
//                 case "FN":
//                         return list_name.filter((Item)=>Item.name==action.name);
//                 default:
//                         return state ='查无此人'
//         }
// }

export let comment = function (state = name, action) {
        // console.log(action.type);
/*  */
        switch (action.type) {
                case "FN":
                        return state = name
                case "ADD":
                        return  name = action.name
                default:
                        return state
        }
}



