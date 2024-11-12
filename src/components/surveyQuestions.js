export const questions = [
	{
		id: "Q1",
		text: "Poste",
		options: [
			{ id: 1, text: "Brest - Landerneau - Morlaix", next: "Q2" },
			{ id: 2, text: "Brest - Quimper", next: "Q2" },
			{ id: 3, text: "Quimper - Nantes", next: "Q2" },
			{ id: 4, text: "Rennes - Brest", next: "Q2" },
			{ id: 5, text: "Rennes - Châteaubriant", next: "Q2" },
			{ id: 6, text: "Rennes - La Brohinière", next: "Q2" },
			{ id: 7, text: "Rennes - Laval", next: "Q2" },
			{ id: 8, text: "Rennes - Messac", next: "Q2" },
			{ id: 9, text: "Rennes - Montreuil", next: "Q2" },
			{ id: 10, text: "Rennes - Nantes", next: "Q2" },
			{ id: 11, text: "Rennes - Quimper", next: "Q2" },
			{ id: 12, text: "Rennes - Quiberon", next: "Q2" },
			{ id: 13, text: "Rennes - St Brieuc", next: "Q2" },
			{ id: 14, text: "Rennes - Vannes", next: "Q2" },
			{ id: 15, text: "Rennes - Vitré", next: "Q2" },
			{ id: 16, text: "St Brieuc - Lannion", next: "Q2" },
			{ id: 17, text: "Brest - Lannion", next: "Q2" }
		],
	},
	{
		id: "Q2",
		text: (answers) => "Sur quelle gare de cet axe voyagez-vous ?",
		options: (answers) => {
			switch (answers.Q1) {
				case 1: // Brest - Landerneau - Morlaix
					return [
						{ id: 1, text: "Gare de Brest", next: "Q3" },
						{ id: 2, text: "Gare de Kerhuon", next: "Q3" },
						{ id: 3, text: "Gare de La Forest-Landerneau", next: "Q3" },
						{ id: 4, text: "Gare de Landerneau", next: "Q3" },
						{ id: 5, text: "Gare de La Roche-Maurice", next: "Q3" },
						{ id: 6, text: "Gare de Landivisiau", next: "Q3" },
						{ id: 7, text: "Gare de Guimiliau", next: "Q3" },
						{ id: 8, text: "Gare de Saint-Thégonnec", next: "Q3" },
						{ id: 9, text: "Gare de Pleyber-Christ", next: "Q3" },
						{ id: 10, text: "Gare de Morlaix", next: "Q3" }
					];

				case 2: // Brest - Quimper
					return [
						{ id: 1, text: "Gare de Quimper", next: "Q3" },
						{ id: 2, text: "Gare de Châtealin", next: "Q3" },
						{ id: 3, text: "Gare de Pont-de-Buis", next: "Q3" },
						{ id: 4, text: "Gare de Dirinon", next: "Q3" },
						{ id: 5, text: "Gare de Landerneau", next: "Q3" },
						{ id: 6, text: "Gare de La Forest-Landerneau", next: "Q3" },
						{ id: 7, text: "Gare de Kerhuon", next: "Q3" },
						{ id: 8, text: "Gare de Brest", next: "Q3" }

					];

				case 3: // Quimper - Nantes
					return [
						{ id: 1, text: "Gare de Quimper", next: "Q3" },
						{ id: 2, text: "Gare de Rosporden", next: "Q3" },
						{ id: 3, text: "Gare de Quimperlé", next: "Q3" },
						{ id: 4, text: "Gare de Lorient", next: "Q3" },
						{ id: 5, text: "Gare de Hennebont", next: "Q3" },
						{ id: 6, text: "Gare de Auray", next: "Q3" },
						{ id: 7, text: "Gare de Vannes", next: "Q3" },
						{ id: 8, text: "Gare de Questembert", next: "Q3" },
						{ id: 9, text: "Gare de Redon", next: "Q3" },
						{ id: 10, text: "Gare de Saint-Gildas-des-bois", next: "Q3" },
						{ id: 11, text: "Gare de Pontchâteau", next: "Q3" },
						{ id: 12, text: "Gare de Savenay", next: "Q3" },
						{ id: 13, text: "Gare de Nantes", next: "Q3" }
					];

				case 4: // Rennes - Brest
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Lamballe", next: "Q3" },
						{ id: 3, text: "Gare de Saint-Brieuc", next: "Q3" },
						{ id: 4, text: "Gare de Guingamp", next: "Q3" },
						{ id: 5, text: "Gare de Plouaret Trégor", next: "Q3" },
						{ id: 6, text: "Gare de Morlaix", next: "Q3" },
						{ id: 7, text: "Gare de Landivisiau", next: "Q3" },
						{ id: 8, text: "Gare de Landerneau", next: "Q3" },
						{ id: 9, text: "Gare de Brest", next: "Q3" }
					];

				case 5: // Rennes - Châteaubriant
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de La Poterie", next: "Q3" },
						{ id: 3, text: "Gare de Vern", next: "Q3" },
						{ id: 4, text: "Gare de Saint-Armel", next: "Q3" },
						{ id: 5, text: "Gare de Corps-Nuds", next: "Q3" },
						{ id: 6, text: "Gare de Janzé", next: "Q3" },
						{ id: 7, text: "Gare de Le Theil-de-Bretagne", next: "Q3" },
						{ id: 8, text: "Gare de Retiers", next: "Q3" },
						{ id: 9, text: "Gare de Martigné-Ferchaud", next: "Q3" },
						{ id: 10, text: "Gare de Châteaubriant", next: "Q3" }
					];

				case 6: // Rennes - La Brohinière
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de L'Hermitage - Mordelles", next: "Q3" },
						{ id: 3, text: "Gare de Breteil", next: "Q3" },
						{ id: 4, text: "Gare de Montfort-sur-Meu", next: "Q3" },
						{ id: 5, text: "Gare de Montauban-de-bretagne", next: "Q3" },
						{ id: 6, text: "Gare de La Brohinière", next: "Q3" }
					];

				case 7: // Rennes - Laval
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Cesson-Sévigné", next: "Q3" },
						{ id: 3, text: "Gare de Noyal - Acigné", next: "Q3" },
						{ id: 4, text: "Gare de Servon", next: "Q3" },
						{ id: 5, text: "Gare de Châteaubourg", next: "Q3" },
						{ id: 6, text: "Gare de Les Lacs", next: "Q3" },
						{ id: 7, text: "Gare de Vitré", next: "Q3" },
						{ id: 8, text: "Gare de Saint-Pierre-la-Cour", next: "Q3" },
						{ id: 9, text: "Gare de Port-Brillet", next: "Q3" },
						{ id: 10, text: "Gare de Le Genest", next: "Q3" },
						{ id: 11, text: "Gare de Laval", next: "Q3" }
					];

				case 8: // Rennes - Messac
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Saint-Jacques-de-la-Lande", next: "Q3" },
						{ id: 3, text: "Gare de Ker Lann", next: "Q3" },
						{ id: 4, text: "Gare de Bruz", next: "Q3" },
						{ id: 5, text: "Gare de Laillé", next: "Q3" },
						{ id: 6, text: "Gare de Guichen - Bourg-des-Comptes", next: "Q3" },
						{ id: 7, text: "Gare de Saint-Senoux - Pléchâtel", next: "Q3" },
						{ id: 8, text: "Gare de Pléchâtel", next: "Q3" },
						{ id: 9, text: "Gare de Messac - Guipry", next: "Q3" }
					];

				case 9: // Rennes - Montreuil
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Pontchaillou", next: "Q3" },
						{ id: 3, text: "Gare de Betton", next: "Q3" },
						{ id: 4, text: "Gare de Chevaigné", next: "Q3" },
						{ id: 5, text: "Gare de Saint-Germain-sur-Ille", next: "Q3" },
						{ id: 6, text: "Gare de Saint-Médard-sur-Ille", next: "Q3" },
						{ id: 7, text: "Gare de Montreuil-sur-Ille", next: "Q3" }
					];

				case 10: // Rennes - Nantes
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Nantes", next: "Q3" }
					];

				case 11: // Rennes - Quimper
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Redon", next: "Q3" },
						{ id: 3, text: "Gare de Questembert", next: "Q3" },
						{ id: 4, text: "Gare de Vannes", next: "Q3" },
						{ id: 5, text: "Gare de Auray", next: "Q3" },
						{ id: 6, text: "Gare de Hennebont", next: "Q3" },
						{ id: 7, text: "Gare de Lorient", next: "Q3" },
						{ id: 8, text: "Gare de Quimperlé", next: "Q3" },
						{ id: 9, text: "Gare de Rosporden", next: "Q3" },
						{ id: 10, text: "Gare de Quimper", next: "Q3" }
					];

				case 12: // Rennes - Quiberon
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Messac - Guipry", next: "Q3" },
						{ id: 3, text: "Gare de Redon", next: "Q3" },
						{ id: 4, text: "Gare de Questembert", next: "Q3" },
						{ id: 5, text: "Gare de Vannes", next: "Q3" },
						{ id: 6, text: "Gare de Auray", next: "Q3" },
						{ id: 7, text: "Gare de Belz - Ploemel", next: "Q3" },
						{ id: 8, text: "Gare de Plouharnel - Carnac", next: "Q3" },
						{ id: 9, text: "Gare de Les Sables Blancs", next: "Q3" },
						{ id: 10, text: "Gare de Penthièvre", next: "Q3" },
						{ id: 11, text: "Gare de L'Isthme", next: "Q3" },
						{ id: 12, text: "Gare de Kerhostin", next: "Q3" },
						{ id: 13, text: "Gare de Saint-Pierre-Quiberon", next: "Q3" },
						{ id: 14, text: "Gare de Quiberon", next: "Q3" }
					];

				case 13: // Rennes - St Brieuc
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Montfort-sur-Meu", next: "Q3" },
						{ id: 3, text: "Gare de Montauban-de-Bretagne", next: "Q3" },
						{ id: 4, text: "Gare de Quédillac", next: "Q3" },
						{ id: 5, text: "Gare de Caulnes", next: "Q3" },
						{ id: 6, text: "Gare de Broons", next: "Q3" },
						{ id: 7, text: "Gare de Plénée-Jugon", next: "Q3" },
						{ id: 8, text: "Gare de Plestan", next: "Q3" },
						{ id: 9, text: "Gare de Lamballe", next: "Q3" },
						{ id: 10, text: "Gare de Yffiniac", next: "Q3" },
						{ id: 11, text: "Gare de Saint-Brieuc", next: "Q3" }
					];

				case 14: // Rennes - Vannes
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Saint-Jacques-de-la-Lande", next: "Q3" },
						{ id: 3, text: "Gare de Ker Lann", next: "Q3" },
						{ id: 4, text: "Gare de Bruz", next: "Q3" },
						{ id: 5, text: "Gare de Laillé", next: "Q3" },
						{ id: 6, text: "Gare de Guichen - Bourg-des-Comptes", next: "Q3" },
						{ id: 7, text: "Gare de Pléchâtel", next: "Q3" },
						{ id: 8, text: "Gare de Messac - Guipry", next: "Q3" },
						{ id: 9, text: "Gare de Fougeray - Langon", next: "Q3" },
						{ id: 10, text: "Gare de Beslé", next: "Q3" },
						{ id: 11, text: "Gare de Redon", next: "Q3" },
						{ id: 12, text: "Gare de Malansac", next: "Q3" },
						{ id: 13, text: "Gare de Questembert", next: "Q3" },
						{ id: 14, text: "Gare de Vannes", next: "Q3" }
					];

				case 15: // Rennes - Vitré
					return [
						{ id: 1, text: "Gare de Rennes", next: "Q3" },
						{ id: 2, text: "Gare de Cesson-Sévigné", next: "Q3" },
						{ id: 3, text: "Gare de Noyal - Acigné", next: "Q3" },
						{ id: 4, text: "Gare de Servon", next: "Q3" },
						{ id: 5, text: "Gare de Châteaubourg", next: "Q3" },
						{ id: 6, text: "Gare de Les Lacs", next: "Q3" },
						{ id: 7, text: "Gare de Vitré", next: "Q3" }
					];

				case 16: // St Brieuc - Lannion
					return [
						{ id: 1, text: "Gare de Saint-Brieuc", next: "Q3" },
						{ id: 2, text: "Gare de La Méaugon", next: "Q3" },
						{ id: 3, text: "Gare de Plouvara - Plerneuf", next: "Q3" },
						{ id: 4, text: "Gare de Châtelaudren - Plouagat", next: "Q3" },
						{ id: 5, text: "Gare de Guingamp", next: "Q3" },
						{ id: 6, text: "Gare de Belle-Isle - Bégard", next: "Q3" },
						{ id: 7, text: "Gare de Plouaret Trégor", next: "Q3" },
						{ id: 8, text: "Gare de Lannion", next: "Q3" }
					];

				case 17: // Brest - Lannion
					return [
						{ id: 1, text: "Gare de Brest", next: "Q3" },
						{ id: 2, text: "Gare de Kerhuon", next: "Q3" },
						{ id: 3, text: "Gare de La Forest-Landerneau", next: "Q3" },
						{ id: 4, text: "Gare de Landerneau", next: "Q3" },
						{ id: 5, text: "Gare de La Roche-Maurice", next: "Q3" },
						{ id: 6, text: "Gare de Landivisiau", next: "Q3" },
						{ id: 7, text: "Gare de Morlaix", next: "Q3" },
						{ id: 8, text: "Gare de Plouigneau", next: "Q3" },
						{ id: 9, text: "Gare de Plounérin", next: "Q3" },
						{ id: 10, text: "Gare de Plouaret Trégor", next: "Q3" },
						{ id: 11, text: "Gare de Lannion", next: "Q3" }
					];

				default:
					return [
						{ id: 1, text: "Erreur: Axe non trouvé", next: "Q3" }
					];
			}
		}
	},
	{
		id: "Q3",
		text: "Montants Pietons",
		freeText: true,
		next: "Q4",
	},
	{
		id: "Q4",
		text: "Montants Vélos",
		freeText: true,
		next: "Q5",
	},
	{
		id: "Q5",
		text: "Descendant Piétons",
		freeText: true,
		next: "Q6",
	},
	{
		id: "Q6",
		text: "Descendant Vélos",
		freeText: true,
		next: "Q7",
	},
	{
		id: "Q7",
		text: "Charge après l'arrêt",
		freeText: true,
		next: "end",
	},
];