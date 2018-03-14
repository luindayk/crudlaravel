
new Vue({
    el: '#crud',
    created : function() {
        this.getKeeps();
    },
    data: {
        keeps: [],
        newKeep: '',
        fillKeep: {'id': '', 'keep': ''},
        errors: []
    },
    methods: {
        getKeeps: function () {
            var urlKeeps = 'tasks';
            axios.get(urlKeeps).then(response => {
                this.keeps = response.data
            });
        },
        deleteKeep: function(keep) {
            var url = 'tasks/' + keep.id;
            axios.delete(url).then(response => { // eliminamos
                this.getKeeps(); // listamos
                toastr.success('Eliminado correctamente'); // mensaje
            });
        },
        editKeep: function(keep) {
            this.errors = [];
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;
            $('#edit').modal('show');
        },
        createKeep: function() {
            this.errors = [];
            var url = 'tasks';
            axios.post(url, {
                keep: this.newKeep
            }).then(response =>{
                this.getKeeps();
                this.newKeep = '';
                this.errors = [];
                $('#create').modal('hide');
                toastr.success('Nueva tarea creada com êxito');
            }).catch(error => {
                this.errors = error.response.data
            })            
        },
        updateKeep: function(id) {
            var url = 'tasks/' + id;
            axios.put(url, this.fillKeep).then(response => {
                this.getKeeps();
                this.fillKeep = {'id': '', 'keep': ''};
                this.errors = [];
                $('#edit').modal('hide');
                toastr.success('Tarea actualzada com êxito');
            }).catch(error => {
                this.errors = error.response.data
            })
        }
    }
});