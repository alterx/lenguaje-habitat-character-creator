// Quick rules reference component

import React from 'react';

export function QuickRules() {
  return (
    <section className="bg-amber-100 rounded-2xl border border-amber-300 p-4">
      <h3 className="font-semibold mb-2 text-green-900">Reglas rápidas</h3>
      <ul className="text-sm space-y-2 text-green-800">
        <li>
          Si hay obstáculos, tirá <b>d20 + atributo</b> contra una dificultad
          apropiada para la ficción.
        </li>
        <li>
          <b>Aguante:</b> Se reduce por daño, cansancio o esfuerzo. Si llega a
          0, quedás inconsciente. Gastá 1 para +2 en
          <b> Vigor/Agilidad</b>.
        </li>
        <li>
          <b>Espíritu:</b> Se reduce por consecuencias emocionales, mentales y
          mágicas. Si llega a 0, todos los obstáculos son más difíciles. Gastá 1
          para +2 en <b>Ingenio/Intuición</b>; 2 para repetir dado.
        </li>
        <li>
          <b>Recursos:</b> Representan conexiones y dinero. Gastá puntos para
          compras, favores u objetos convenientes.
        </li>
        <li>
          <b>Consecuencias:</b> Cuando fallás una tirada, el <b>Guía </b>
          puede aplicar consecuencias apropiadas a la ficción. Esto puede
          incluir daño, pérdida de recursos o complicaciones narrativas. El daño
          sugerido en puntos es de 1 a 4, donde 1 es leve, 2 es moderado, 3 es
          grave y 4 es letal/excepcional.
        </li>
      </ul>
    </section>
  );
}
