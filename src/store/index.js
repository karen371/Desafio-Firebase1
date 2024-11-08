import { createStore } from "vuex";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';

export default createStore({
  state: {
    usuarios: [],
    usuarioSeleccionado: null, //usuario para modificar los datos
  },
  mutations: {
    ReadUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
    AddUsuarios(state, usu) {
      state.usuarios.push(usu);
    },
    RemoveUsuario(state, idusu) {
      state.usuarios = state.usuarios.filter(usuario => usuario.id !== idusu);
    },
    UpdateUsuario(state, updatedUser) {
      const index = state.usuarios.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.usuarios[index] = updatedUser;
      }
    },
    setUsuarioSeleccionado(state, usuario) {
      state.usuarioSeleccionado = usuario;
    },
    resetUsuarioSeleccionado(state) {
      state.usuarioSeleccionado = null;
    },
  },
  actions: {
    //obtener los datos para mostrar
    async ListarUsuarios({ commit }) {
      try {
        const db = getFirestore(firebaseApp);
        const usuariosRef = collection(db, 'usuario');
        const snapshot = await getDocs(usuariosRef);
        const usuarios = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        commit('ReadUsuarios', usuarios);
      } catch (error) {
        console.log(error);
      }
    },
    //agregar un nuevo usuario
    async addUsuarios({ commit }, usu) {
      try {
        const db = getFirestore(firebaseApp);
        const usuariosRef = collection(db, 'usuario');
        const docRef = await addDoc(usuariosRef, usu);
        // Agregar el ID generado por Firestore al usuario
        const usuarioConId = { id: docRef.id, ...usu };
        commit('AddUsuarios', usuarioConId);
      } catch (error) {
        console.log(error);
      }
    },
    //eliminar un usuario
    async deleteUsuario({ commit }, idusu) {
      try {
        const db = getFirestore(firebaseApp);
        const usuariosRef = doc(db, 'usuario', idusu);
        await deleteDoc(usuariosRef);
        commit('RemoveUsuario', idusu);
      } catch (error) {
        console.log(error);
      }
    },
    //modificar los datos de usuario
    async updateUsuario({ commit }, { idusu, updatedData }) {
      try {
        const db = getFirestore(firebaseApp);
        const usuariosRef = doc(db, 'usuario', idusu);
        await updateDoc(usuariosRef, updatedData);
        commit('UpdateUsuario', { id: idusu, ...updatedData });
      } catch (error) {
        console.log(error);
      }
    },
    //para el usuario seleccionado
    setUsuarioSeleccionado({ commit }, usuario) {
      commit('setUsuarioSeleccionado', usuario);
    },
    resetUsuarioSeleccionado({ commit }) {
      commit('resetUsuarioSeleccionado');
    },
  }
});

