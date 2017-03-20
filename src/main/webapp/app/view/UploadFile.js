Ext.setup({
    requires: [
        'Ext.form.Panel',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.File',
        'Ext.Toolbar',
        'Ext.ProgressIndicator'
    ],

    onReady: function() {

        // If we do not add the progress indicator to anything, it is automatically
        // added to the Viewport when progress starts.
        var progressIndicator = Ext.create("Ext.ProgressIndicator");

        var request = {
            url: 'http://sencha-xhr2-demos.herokuapp.com/form-upload.php',
            method: 'POST',

            // Commenting out xhr2 causes Touch to attempt to send this form through 
            // an iframe for the upload. When xhr2 is true, a new HTML5 FormData object
            // creates to send all fields.
            xhr2: true,

            progress: progressIndicator,

            //Progress can also be a simple callback
            /*progress: function(e) {
                console.log((e.loaded / e.total) * 100);
             },*/

            success: function(form, response) {
                var out = Ext.getCmp("output");
                if(response) {
                    out.setHtml(response.message);
                    for(var file in response.files) {
                        file = response.files[file];
                        out.setHtml(out.getHtml() + "<br/>-" + file.name +": " + file.size);
                    }
                }
            },
            failure: function(form, response) {
                var out = Ext.getCmp("output");
                out.setHtml(response.message);
            }
        };

        Ext.Viewport.add({
            xtype:"formpanel",
            layout:"vbox",
            fullscreen:true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'My Uploader',
                    items: [
                        {
                            xtype: "textfield",
                            name: "firstName",
                            label: "First Name:"
                        },
                        {
                            xtype: "textfield",
                            name: "lastName",
                            label: "Last Name:"
                        },
                        {
                            xtype:"filefield",
                            label: "Select image(s):",
                            name: "photos",
                            accept:"image/jpeg",
                            multiple: true
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    layout: {
                        pack: 'center'
                    },
                    ui: 'plain',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Submit',
                            ui: 'confirm',
                            handler: function() {
                                var form = Ext.Viewport.down("formpanel");
                                var input = Ext.Viewport.down("filefield").getComponent().input;
                                var files = input.dom.files;
                                for(var i = 0 ; i<files.length ; i++){
                                    var file = files[i];
                                    if(file.size > 2097152) {
                                        Ext.Msg.alert("JPG Must be less then 2MB");
                                        return;
                                    }
                                }
                                form.submit(request);
                            }
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "output",
                    padding: "10px",
                    scrollable: true,
                    flex:1
                }
            ]
        });
    }
});