import React from 'react';
import { Text, Image, View, Button } from 'react-native';
import { observer } from 'mobx-react/native';

import store from '../../stores/store';

@observer export default class DocView extends React.Component{

    constructor(props){
        super(props);
        this.addText = this.addText.bind(this);
        this.addImage = this.addImage.bind(this);
    }

    addText(){
        store.docs.addText('hola ' + Math.random());
    }

    addImage(){
        store.docs.addImage(
            'https://fotografias.lasexta.com/clipping/cmsimages01/2017/02/07/364CAAAC-A60E-43BB-8FED-05AA0B8F3AF9/58.jpg',
            Math.round(Math.random() * 100 + 50)
        );
    }

    render(){
        let { id } = this.props.match.params;
        
        if(store.docs.selected === null || 
            id != store.docs.selected.id){
            store.docs.setSelectedById(id);
        }

        let doc = store.docs.selected;

        return (
            <View>
                <Text>Doc View {id}</Text>
    
                {doc.blocks && doc.blocks.map((block) => {
                    if(block.type === 'text'){
                        return <Text key={block.id}>{block.text}</Text>
                    } else {
                        return <Image key={block.id}
                            style={{ height: block.height || 100 }}
                            source={{ uri: block.url }} />
                    }
                })}

                <View>
                    <Button onPress={this.addText} title="Add Text" />
                    <Button onPress={this.addImage} title="Add Image"/>
                </View>
            </View>
        );
    }
}