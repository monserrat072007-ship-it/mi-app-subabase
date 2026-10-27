import { createClient } from
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Conexión con Supabase
const supabaseUrl = 'https://xxmhpydrngcxqmlrjifv.supabase.co';
const supabaseKey = 'sb_publishable_dW9tCFVnu4clRBHeWa-2aQ_g9VC6DHI';

const supabase = createClient(supabaseUrl, supabaseKey);

// Elementos del HTML
const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');
const mensaje = document.getElementById('mensaje');

// Consultar y mostrar estudiantes
async function obtenerEstudiantes() {
    const { data, error } = await supabase
        .from('estudiantes')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error al obtener estudiantes:', error);
        mensaje.textContent = 'Error al cargar los estudiantes.';
        return;
    }

    lista.innerHTML = '';

    data.forEach((estudiante) => {
        const elemento = document.createElement('li');
        elemento.textContent =
            `${estudiante.nombre} - ${estudiante.carrera}`;
        lista.appendChild(elemento);
    });
}

// Registrar un estudiante
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const carrera = document.getElementById('carrera').value.trim();

    if (!nombre || !carrera) {
        mensaje.textContent = 'Completa todos los campos.';
        return;
    }

    const { error } = await supabase
        .from('estudiantes')
        .insert([{ nombre, carrera }]);

    if (error) {
        console.error('Error al registrar:', error);
        mensaje.textContent = 'No se pudo registrar el estudiante.';
        return;
    }

    mensaje.textContent = '¡Estudiante registrado correctamente!';
    formulario.reset();

    await obtenerEstudiantes();
});

// Cargar estudiantes al abrir la página
obtenerEstudiantes();


