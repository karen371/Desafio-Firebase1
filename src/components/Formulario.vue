<template>
    <div>
      <div class="title">
        <h1>{{ formularioModo === 'editar' ? 'Modificar Usuario' : 'Agregar Nuevo Usuario' }}</h1>
      </div>
      <!-- Formulario -->
      <form @submit.prevent="guardarUsuario">
        <div>
          <label for="nombre">Nombre:</label>
          <input
            v-model="nuevoUsuario.nombre"
            type="text"
            id="nombre"
            required
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            v-model="nuevoUsuario.correo"
            type="email"
            id="email"
            required
          />
        </div>
        <button type="submit">
          {{ formularioModo === 'editar' ? 'Guardar Cambios' : 'Agregar Usuario' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'Formulario',
    data() {
      return {
        formularioModo: 'agregar', // Modo: 'agregar' o 'editar'
        nuevoUsuario: {
          nombre: '',
          correo: '',
        },
      };
    },
    computed: {
      ...mapState({
        usuarioSeleccionado: state => state.usuarioSeleccionado,
      }),
    },
    watch: {
      usuarioSeleccionado(newVal) {
        if (newVal) {
          // Si hay un usuario seleccionado, cambiamos el modo a 'editar' y cargamos los datos
          this.formularioModo = 'editar';
          this.nuevoUsuario = { ...newVal };  // Cargar los datos del usuario
        }
      },
    },
    methods: {
      async guardarUsuario() {
        if (this.formularioModo === 'editar') {
          // Si estamos en modo editar, actualizamos el usuario
          await this.$store.dispatch('updateUsuario', {
            idusu: this.nuevoUsuario.id,
            updatedData: {
              nombre: this.nuevoUsuario.nombre,
              correo: this.nuevoUsuario.correo,
            },
          });
        } else {
          // Si estamos en modo agregar, agregamos un nuevo usuario
          await this.$store.dispatch('addUsuarios', this.nuevoUsuario);
        }
  
        // Limpiar el formulario después de guardar
        this.formularioModo = 'agregar';
        this.nuevoUsuario = { nombre: '', correo: '' };
  
        // Reseteamos el usuario seleccionado en Vuex
        this.$store.dispatch('resetUsuarioSeleccionado');
      },
    },
    created() {
      // Inicializamos el formulario vacío
      this.nuevoUsuario = { nombre: '', correo: '' };
    },
  };
  </script>
  
  
<style scoped>
  .title{
    margin: 20px;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }
  
  div {
    margin-bottom: 10px;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    padding: 8px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  