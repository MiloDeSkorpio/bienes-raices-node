import {Dropzone} from "dropzone";

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

console.log(token)

Dropzone.options.imagen = {
  dictDefaultMessage: 'Sube tus imagenes aqui',
  acceptedFiles: '.png,.jpg,.webp,.jpeg',
  maxFilesize: 10,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  method: 'post',
  dictRemoveFile: 'Eliminar Imagen',
  dictMaxFilesExceeded: 'El Limite son 10 Imagenes',
  dictFileTooBig: 'El archivo es demasiado grande.',
  headers: {
    'CSRF-Token': token
  },
  paramName: 'imagen',
  init: function() {
    const dropzone = this;
    const bntPublicar = document.querySelector('#publicar');

    bntPublicar.addEventListener('click', function(){
      dropzone.processQueue();
    });

    dropzone.on('queuecomplete', function(){
      if(dropzone.getActiveFiles().length == 0) {
          window.location.href = '/mis-propiedades'
      }
    });

  }
}