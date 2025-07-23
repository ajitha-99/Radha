import { LightningElement } from 'lwc';

export default class RenderListDemo extends LightningElement {
//dealing with primitive dat. when we make a call to api we get the values in the form f array and how to deal those is below
    superStars = ["Spiderman", "Superman", "Batman", "Ironman", "Hulk"];
// in general w emake any apex call the list of records with different inputs in the form of array
    contactList =[{
        id:1,
        fname: "Radha",
        lname: "G",
        age: "29"
    },
    {id:2,
        fname:"Amma",
        lname: "pichai",
        age: "30"
    },
    {id:3,
        fname:"Sri",
        lname: "Musk",
        age: "32"
    },
    {id:4,
        fname:"Sara",
        lname: "cook",
        age: "31"
    }
];

}