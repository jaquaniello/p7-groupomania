
const Coms = require('../models/Coms')
const fs = require("fs");
const { Console } = require('console');


    exports.COMS = (req, res, next) => {  
        
        if(req.file === undefined){
       

         const coms = new Coms({
            

                coms: req.body.message,
                userId: req.body.user_id,
                _id: req.body._id,
                pseudo: req.body.pseudo,
                likes: 0,
                usersLiked: [],                
                })
                
            
         
            
        
            coms.save()
            .then(() => res.status(201).json({ message: 'coms crée'}))
            
            .catch(error => res.status(400).json({ error }))
            
        }else{

            const coms = new Coms({
            

                coms: req.body.message,
                userId: req.body.user_id,
                _id: req.body._id,
                pseudo: req.body.pseudo,                
                   imageUrl:`${req.protocol}://${req.get("host")}/images/${
                    req.file.filename 
                   }`,
                   likes: 0,
                usersLiked: [],     
                })
                
            
         
            
        
            coms.save()
            .then(() => res.status(201).json({ message: 'coms crée'}))
            
            .catch(error => res.status(400).json({ error }))

        }
       

            
        }

        exports.getAllComs = (req, res, next) => {
        
            Coms.find()

            .then((coms) => res.status(200).json(coms))
            .catch((error) => res.status(400).json({ error }))

        }

        exports.deleteComs = (req, res, next) => {

            Coms.findOne({_id: req.params.id })
            .then((comD) => {

                if(comD.imageUrl){

                    const filename = comD.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {});
                }

                

            Coms.deleteOne({ _id: req.params.id })
            .then((comsS) => res.status(200).json(comsS)) 
            .catch((error) => res.status(400).json({ error }))
            })
            .catch((error) => res.status(404).json({ error }));

                }

    

        exports.getOneComs = (req, res, next) => {
            // on utilise le modele mangoose et findOne pour trouver un objet via la comparaison req.params.id
            Coms.findOne({ _id: req.params.id })
              // status 200 OK et l'élément en json
              .then((coms) => res.status(200).json(coms)) 
              
              // si erreur envoit un status 404 Not Found et l'erreur en json
              .catch((error) => res.status(404).json({ error }));
        
          };

          


          exports.updateComs = (req, res, next) => {
 
            Coms.findOne({_id: req.params.id })
            .then((com) => {
               

                var sauceBot;

                const immuable = {
                    userId: com.userId,
                    likes: com.likes,
                usersLiked: com.usersLiked,
                pseudo: com.pseudo, 
                }
                /* console.log(req.body) */
               
                if(req.file && com.imageUrl){

                    
                    const filename = com.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {});
                    
                    const comsObject = {
                        ...req.body,
                        // on ajoute l'image avec ce nom
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${
                          req.file.filename
                        }`,
                        ...immuable,
                      };
                      sauceBot = comsObject;
                }else if(req.file){
                    
                    const comsObject = {
                        ...req.body,
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${
                          req.file.filename
                        }`,
                        ...immuable,
                      };
                      sauceBot = comsObject;
                }else if(com.imageUrl && req.file == undefined && req.body.imageUrl){

                    const comsObject = {
                        ...req.body,
                        ...immuable,
                      };
                      sauceBot = comsObject;
                    

                }else if(com.imageUrl){

                     
                    const filename = com.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {});

                    const comsObject = {
                        ...req.body,
                        ...immuable,
                    }
                    sauceBot = comsObject;


                }
                else{
          

                /* const filename = com.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {});  */

            const comsObject = {
                ...req.body,
                ...immuable,
            }
            sauceBot = comsObject;


            }
                Coms.updateOne(
                    {_id: req.params.id},
                    {...sauceBot, _id: req.params.id}
                )
                    .then(() => res
            .status(201)
            .json({ message: "modified sauce (FR)Objet modifié !" }))
                
            .catch((error) => res.status(400).json({ error }))
                })  
        
        .catch((error) => res.status(400).json({ error }));
                }



                exports.likeComs = (req, res, next) => {
                    // on utilise le modele mangoose et findOne pour trouver un objet via la comparaison req.params.id
                    Coms.findOne({ _id: req.params.id })
                      //retourne une promesse avec reponse status 200 OK et l'élément en json
                      .then((com) => {
                        // définition de diverse variables
                        let valeurVote;
                        let votant = req.body.userId;
                        let like = com.usersLiked;
                        // determine si l'utilisateur est dans un tableau
                        let bon = like.includes(votant);
                        // ce comparateur va attribuer une valeur de point en fonction du tableau dans lequel il est
                        if (bon === true) {
                          valeurVote = 1;
                        }else {
                          valeurVote = 0;
                        }
                        // ce comparateur va determiner le vote de l'utilisateur par rapport à une action de vote
                        // si l'user n'a pas voté avant et vote positivement
                        if (valeurVote === 0 && req.body.like === 1) {
                          // ajoute 1 vote positif à likes
                          com.likes += 1;
                          // le tableau usersLiked contiendra l'id de l'user
                          com.usersLiked.push(votant);
                
                
                          // si l'user a voté positivement + et veut annuler son vote
                        } else if (valeurVote === 1 && req.body.like === 1) {
                          // enlève 1 vote positif
                          com.likes -= 1;
                          // filtre/enlève l'id du votant du tableau usersLiked
                          const nouveauUsersLiked = like.filter((f) => f != votant);
                          // on actualise le tableau
                          com.usersLiked = nouveauUsersLiked;
                          // si l'user a voté négativement - et veut annuler son vote
                        }else {
                          console.log("tentavive de vote illégal");
                        }
                        // met à jour la sauce
                        Coms.updateOne(
                          { _id: req.params.id },
                          {
                            likes: com.likes,
                            usersLiked: com.usersLiked,
                          }
                        )
                          // retourne une promesse avec status 201 Created et message en json
                          .then(() => res.status(201).json({ message: "Vous venez de voter" }))
                          // en cas d'erreur un status 400 et l'erreur en json
                          .catch((error) => {
                            if (error) {
                              console.log(error);
                            }
                          });
                      })
                      // si erreur envoit un status 404 Not Found et l'erreur en json
                      .catch((error) => res.status(404).json({ error }));
                  };
                

