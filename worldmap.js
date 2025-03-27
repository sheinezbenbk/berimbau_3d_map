const WorldMapLeaflet = () => {
    const [showModel, setShowModel] = React.useState(false);
    const [mapInitialized, setMapInitialized] = React.useState(false);

    // Coordonnées du Brésil 
    const brazilCoords = [-14.235, -51.9253];

    const toggleModel = () => {
        setShowModel(!showModel);
    };

    // Initialisation de la carte Leaflet
    React.useEffect(() => {
        if (mapInitialized) return;


        const loadLeaflet = async () => {

            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
            document.head.appendChild(linkElement);


            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
            script.async = true;


            script.onload = () => {
                if (window.L) {
                    initMap();
                }
            };

            document.body.appendChild(script);
        };

        const initMap = () => {
            const L = window.L;

            // Créer la carte
            const map = L.map('map').setView([20, 0], 2);


            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            // marqueur pour le Brésil 
            const brazilIcon = L.divIcon({
                html: `<div class="marker-brazil" style="
            background: radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(5,150,105,0.6) 100%);
            border: 2px solid #10b981;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            box-shadow: 0 0 15px #10b981;
          "></div>`,
                className: '',
                iconSize: [20, 20]
            });

            // Créer le marqueur
            const marker = L.marker(brazilCoords, { icon: brazilIcon }).addTo(map);


            marker.bindTooltip("Cliquez pour voir le bérimbau", {
                direction: 'top',
                className: 'custom-tooltip',
                offset: [0, -10]
            });


            marker.on('click', function () {
                toggleModel();
            });

            setMapInitialized(true);
        };

        loadLeaflet();


        return () => {
            if (window.L && window.L.map) {

            }
        };
    }, [mapInitialized]);

    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
                Carte Mondiale Interactive
            </h2>

            <p className="mb-4 text-gray-600">
                Cliquez sur le point lumineux au Brésil pour afficher le bérimbau en 3D
            </p>

            {/* Conteneur de la carte */}
            <div id="map" className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-emerald-400 mb-6"></div>


            {/* Zone d'affichage du modèle 3D */}
            {showModel && (
                <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border border-emerald-500 rounded-xl p-6 shadow-xl transition-all duration-500 ease-in-out">
                    <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            Bérimbau du Brésil
                        </h3>

                        {/* Disposition en deux colonnes : modèle 3D à gauche, texte à droite */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Modèle 3D - Colonne de gauche */}
                            <div className="md:w-1/2 h-96 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center rounded-lg border border-emerald-800">
                                <model-viewer
                                    src="./Berimbau_SAE402.glb"
                                    alt="Modèle 3D de Bérimbau"
                                    auto-rotate
                                    camera-controls
                                    environment-image="neutral"
                                    shadow-intensity="1"
                                    shadow-softness="0.5"
                                    exposure="1"
                                    style={{width: '100%', height: '100%'}}>
                 onload={() => console.log('Modèle chargé avec succès')}
    onerror={(error) => console.error('Erreur de chargement du modèle:', error)}>

                                </model-viewer>
                            </div>

                            {/* Texte - Colonne de droite avec défilement */}
                            <div className="md:w-1/2 h-96 overflow-y-auto pr-2 text-gray-200 text-left">
                                <div className="h-full">
                                    <p className="mb-3">
                                        L'art du Berimbau : l'instrument à cordes
                                    </p>
                                    
                                    <p className="mb-3">
                                        Si un seul instrument devait être joué durant la capoeira, ça serait le berimbau. C'est un instrument à corde venant du Brésil. 
                                        Il est à coup sûr un ancêtre des instruments à corde contemporain, comme le violon, la contrebasse, la harpe…
                                    </p>
                                    
                                    <p className="mb-3">
                                        Bien qu'il soit apparu dans le vaste pays d'Amérique du Sud, cet art musical est en réalité un instrument traditionnel fabriqué 
                                        par des esclaves d'Afrique, plus précisément par le peuple kambas (peuple des Congos et d'Angola). Ce qui garde en lui ses origines 
                                        africaines lors des déportations de ces esclaves en Amérique latine.
                                    </p>
                                    
                                    <p className="mb-3">
                                        Il en existe trois types : le Gunga (instrument du maître de la roda), le Médio (l'instrument qui va souligner la gunga), 
                                        et le Viola (soliste qui accentue le rythme).
                                    </p>
                                    
                                    <p className="mb-3">
                                        Composé d'un biriba, d'une baguette et d'un caxixi en bois de verga, d'un dobrão, une pièce de monnaie en métal et d'un fil de fer, 
                                        le berimbau à un son unique qui donne le rythme au capoeiriste.
                                    </p>
                                    
                                    <p className="mb-3">
                                        Représentant la capoeira, le berimbau est un symbole de la culture afro-brésilienne, et elle nous montre qu'une pratique opprimée 
                                        peut devenir un réel symbole culturel et une source d'inspiration pour le monde entier.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={toggleModel}
                                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white py-2 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2">
                                <span>Fermer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>




            )}

           
            <div className="mt-6 text-sm text-gray-600 max-w-lg text-center">
                <p>
                    SAE 402 - Bal Zeinabou & Ben Boubaker Sheinez
                </p>

            </div>
        </div>
    );
}
