<script>
import { mapState } from 'vuex';

export default {
  name: 'Listar',
  computed: {
    ...mapState({
      usuarios: state => state.usuarios,
    }),
  },
  methods: {
    eliminarUsuario(id) {
      this.$store.dispatch('deleteUsuario', id);
    },
    modificarUsuario(usuario) {
      this.$store.dispatch('setUsuarioSeleccionado', usuario);
    },
  },
  created() {
    this.$store.dispatch('ListarUsuarios');
  },
};
</script>
<template>
  <div>
    <div><h2>Lista de usuarios</h2></div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.correo }}</td>
          <td>
            <button class="button" @click="eliminarUsuario(usuario.id)">Eliminar</button>
            <button class="button button-modificar" @click="modificarUsuario(usuario)">Modificar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>
<style scoped>
.table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.table thead {
  background-color: #4a90e2;
  color: #fff;
  text-align: center;
}

.table th,
.table td {
  padding: 0.75rem;
  text-align: center;
  vertical-align: middle;
  color: black;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-striped tbody tr:nth-of-type(even) {
  background-color: #eef2f7;
}

.table-hover tbody tr:hover {
  background-color: #d1e7ff;
}

.button {
  background-color: #ff5f57;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #ff3e30;
}

.button-modificar {
  background-color: #34c759;
  color: #fff;
}

.button-modificar:hover {
  background-color: #28a745;
}

</style>