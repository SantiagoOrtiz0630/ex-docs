import { observable, action, computed } from 'mobx';
import { AsyncStorage } from 'react-native';

import { db, auth, storage } from '../config/FBConfig';

export class Documents {

    constructor(){
        this.readStorage();
    }

    @observable selected = null;

    @observable list = [
        {
            name: 'Doc 1',
            id: 0,
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'Texto documento 1'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://static2.lasprovincias.es/www/multimedia/201706/25/media/cortadas/gato-kngE-U4015529328506D-624x385@Las%20Provincias.jpg'
                }
            ],
        },{
            name: 'Doc 2',
            id: 1,
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'Texto documento 2'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://static2.lasprovincias.es/www/multimedia/201706/25/media/cortadas/gato-kngE-U4015529328506D-624x385@Las%20Provincias.jpg'
                }
            ],
        },{
            name: 'Doc 2',
            id: 2,
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'Texto documento 3'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://static2.lasprovincias.es/www/multimedia/201706/25/media/cortadas/gato-kngE-U4015529328506D-624x385@Las%20Provincias.jpg'
                }
            ],
        },
    ];

    @action readDocuments(){
        this.cleanDocsList();

        let ref = db.collection("docs");//ruta        
        ref.where("owner", "==", "x")
        .get()
        .then((querySnapshot) => {
            this.list = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());

                let docTemp = {
                    ...doc.data(),
                    id: doc.id
                }

                this.list.push(docTemp);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    @action cleanDocsList(){
        this.list = null;
    }

    @action setCurrentDocById(id){
        let doc = this.list.find(doc => doc.id === parseInt(id));

        this.currentDoc = doc;
    }

    @action addText(newText){
        this.currentDoc.blocks.push({
            id: this.currentDoc.blocks.length,
            type: 'text',
            text: newText
        });
        this.updateStorage();
    }

    @action addImage(newImage, height){
        this.currentDoc.blocks.push({
            id: this.currentDoc.blocks.length,
            type: 'img',
            url: newImage,
            height
        });
        this.updateStorage();
    }


    async updateStorage(){
        try {
            await AsyncStorage.setItem('list', JSON.stringify(this.list));
        } catch (e) {
            // saving error
        }
    }

    async readStorage(){
        try {
            const value = await AsyncStorage.getItem('list')
            if(value !== null) {
            let storageList = JSON.parse(value);
            if(storageList !== null) this.list = storageList;
            }
        } catch(e) {
            // error reading value
        }
    }

}