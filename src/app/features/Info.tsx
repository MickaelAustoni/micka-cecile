export default function Info() {
  return (
    <div className="container mx-auto text-black p-6 space-y-8">
      {/* Dress Code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dress Code</h2>
        <div className="space-y-4">
          <p>Pour cette journée spéciale, nous vous invitons à porter des tons:</p>

          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green"></div>
              <span>Vert kaki/sapin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-secondary"></div>
              <span>Vert d&#39;eau/Sauge</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brown"></div>
              <span>Marron/Rouille</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brown-secondary"></div>
              <span>Beige/Champagne</span>
            </div>
          </div>

          <p>⚠️ Attention, le blanc est résérvé à la mariée.</p>
        </div>
      </section>

      <hr className="border-green-secondary"/>

      {/* Plan d'accès */}
      <section className="">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Déroulé & Plan d&#39;accès</h2>

            <div className="space-y-1">
              <h3 className="font-medium"><s>Cérémonie civile - 14h30</s></h3>
              <p><s>Hôtel de ville</s></p>
              <p><s>83720 Trans en Provence</s></p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium">Cérémonie religieuse - 15h00</h3>
              <p>Eglise Saint Victor</p>
              <p>83720 Trans en Provence</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium">Photos de groupes - 16h45</h3>
              <p>Place de l&#39;hôtel de ville</p>
              <p>83720 Trans en Provence</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium">La réception - 18h30</h3>
              <p>Salle polyvalante de Montferrat</p>
              <p>83131 Montferrat</p>
            </div>
          </div>

          {/* Hébergements */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Hébergements</h2>

              <p>Vous pouvez trouver un hébergement sur Airbnb à Montferrat ou dans les environs.
                Mais pas que…
                L’hôtel de la Bastide situé à deux pas de la salle polyvalente de Montferrat, peut être aussi une option
                !
                La nuit suivant le mariage (après la fête) nous logerons à l’hôtel. Selon le nombre de personnes étant
                intéressés, nous pouvons voir pour faire un tarif de groupe.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">On compte sur vous !</h2>
              <p className="mb-8">Pour nous aider à organiser au mieux cette belle journée, merci de nous confirmer
                votre
                présence avant le <strong>31 janvier 2025</strong>.
              </p>
            </div>
          </div>
        </div>

      </section>

      <hr className="border-green-secondary"/>

      {/* Coordonnées */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contactez-nous</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <h3 className="font-medium">Micka</h3>
            <p>Téléphone: <a href="tel:0762706438" className="underline">07 62 70 64 38</a></p>
            <p>Email: <a href="mailto:mickael.austoni@gmail.com" className="underline">mickael.austoni@gmail.com</a>
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Cécile</h3>
            <p>Téléphone: <a href="tel:0760297628" className="underline">07 60 29 76 28</a></p>
            <p>Email: <a href="mailto:cecileoliveira83@gmail.com" className="underline">cecileoliveira83@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
