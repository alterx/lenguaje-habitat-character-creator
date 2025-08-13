export function QuickRules() {
  return (
    <section className="bg-parchment-300 bg-paper-texture backdrop-blur-sm rounded-2xl border border-parchment-600 p-4 shadow-lg">
      <h3 className="font-semibold mb-2 text-forest-800 font-serif">
        Reglas rápidas
      </h3>
      <ul className="text-sm space-y-2 text-forest-800">
        <li>
          Si hay obstáculos, tirá <strong>d20 + atributo</strong> contra una
          dificultad apropiada para la ficción.
        </li>
        <li>
          <strong>Aguante:</strong> Se reduce por daño, cansancio o esfuerzo. Si
          llega a 0, quedás inconsciente. Gastá 1 para +2 en
          <strong> Vigor/Agilidad</strong>.
        </li>
        <li>
          <strong>Espíritu:</strong> Se reduce por consecuencias emocionales,
          mentales y mágicas. Si llega a 0, todos los obstáculos son más
          difíciles. Gastá 1 para +2 en <strong>Ingenio/Intuición</strong>; 2
          para repetir dado.
        </li>
        <li>
          <strong>Recursos:</strong> Representan conexiones y dinero. Gastá
          puntos para compras, favores u objetos convenientes.
        </li>
        <li>
          <strong>Consecuencias:</strong> Cuando fallás una tirada, el{' '}
          <strong>Guía </strong>
          puede aplicar consecuencias apropiadas a la ficción. Esto puede
          incluir daño, pérdida de recursos o complicaciones narrativas. El daño
          sugerido en puntos es de <strong>1 a 4</strong>, donde{' '}
          <strong>1</strong> es leve, <strong>2</strong> es moderado,{' '}
          <strong>3</strong> es grave y <strong>4</strong> es letal/excepcional.
        </li>
      </ul>
    </section>
  );
}
