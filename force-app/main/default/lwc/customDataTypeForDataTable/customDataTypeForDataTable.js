import LightningDataTable from "lightning/datatable";
import customNameTemplate from './customName.html';
import customRankTemplate from './customRank.html';
import customImageTemplate from './customImage.html';
import customPicklistTemplate from './customPicklist.html';
import customPicklistEditTemplate from './customPicklistEdit.html';
export default class CustomDataTypeForDataTable extends LightningDataTable {

static customTypes = {
    customName: {
        template: customNameTemplate,
        standardCellLayout: true,
        typeAttributes: ["contactName"]

    },
    customRank: {
        template: customRankTemplate,
        standardCellLayout: false,
        typeAttributes: ["rankIcon"]

    },
    customImage: {
        template: customImageTemplate,
        standardCellLayout: true,
        typeAttributes: ["pictureUrl"]

    },
//with the help of context whatever the records/values 
//we are modifying that id's will be transferred to the 
//context and we can access it by using context
    customPicklist: {
        template: customPicklistTemplate,
        editTemplate: customPicklistEditTemplate,
        standardCellLayout: true,
        typeAttributes: ["options", "value", "context"]

    }
}

}