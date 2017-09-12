function PlaygroundBuilder(title, id, entry, active, readOnly, files, dir){
    // config
    var baseurl = '/stylable';
    var loaderUrl = baseurl + "/js/vs/loader.js";
    id = id || 'project';
    //
    var invokingScript = document.currentScript;
    window["require"]["config"]({baseUrl: baseurl + "/js"});
    // 
    files = [
        'app.st.css',
        'app.tsx',
        'backoffice-theme.st.css',
        'button.st.css',
        'button.tsx',
        'project.st.css'
    ]
    this.loadProject(id, entry, active, readOnly, files, dir, baseurl)
    .then(function(project){
        // create iframe
        var playgroundWrapper = document.createElement('div');
        playgroundWrapper.classList.add('playground');
      
        // replace invoking script with playground
        invokingScript.parentElement.replaceChild(playgroundWrapper, invokingScript);

        // render playground
        ReactDOM.render(
            React.createElement(Playground.default, {
                playgroundName: id,
                headerText: title,
                useLoader: true,
                loaderUrl: loaderUrl,
                projects: [project]
            }), 
            playgroundWrapper
        );

    });
}

PlaygroundBuilder.prototype = {

    // addTag: function(createElement, tagName, attributes, fields, appendTo){
    //     var element = createElement(tagName);
    //     if(attributes){
    //         Object.keys(attributes).forEach(element.setAttribute.bind(element));
    //     }
    //     if(fields){
    //         Object.keys(fields).forEach(function(key, value){ element.setAttribute.bind(element) });
    //     }
    //     playgroundCSS.setAttribute('rel', 'stylesheet');
    //     playgroundCSS.setAttribute('href', baseurl + '/css/Playground.css');
    //     iframe.contentDocument.head.appendChild(playgroundCSS);
    // }
    
    createEntryWrapper: function(entryName){
        return function(entry) {
            return `
                import * as React from 'react';
                import * as ReactDOM from 'react-dom';
                import EntryComp from "./${entryName}";
                ReactDOM.render(<EntryComp />, document.getElementById('root'))
            `;
        }
    },

    loadProject: function(id, entry, active, readOnly, files, dir, baseurl){
        if(!entry || !active){
            throw new Error('playground missing params');
        }
        var project = {
            name: id,
            entry: entry,
            active: active,
            readOnly: !!readOnly || false,
            entryWrapper: this.createEntryWrapper(entry),
            files:  (files || []).reduce(function(acc, fileName){
                var fileLabel = fileName;
                if(acc[fileLabel]){
                    throw new Error('playground must contain flat file list');
                }
                acc[fileLabel] = {
                    uri: fileName,
                    extension: fileName.slice(fileName.lastIndexOf('.')),
                    content: ''
                };
                return acc; 
            }, {})
        };
        return Promise.all(Object.keys(project.files).map(function(fileLabel){
            var file = project.files[fileLabel];
            return fetch(baseurl + dir + '/' + file.uri).then(function(response) {
                return response.text();
            }).then(function(content) {
                file.content = content;
            })
        })).then(function(){
            return project;
        });
    }
}
