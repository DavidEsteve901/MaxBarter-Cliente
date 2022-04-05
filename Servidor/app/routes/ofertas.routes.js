import { Router } from "express";
const router = Router();

//Importamos todos los métodos
import * as ofertaCtrl from '../controllers/oferta.controller'

router.post('/', ofertaCtrl.createOferta)

router.get('/', ofertaCtrl.getOfertas)

router.get('/:ofertaId', ofertaCtrl.getOfertabyId)

router.put('/:ofertaId', ofertaCtrl.updateOfertaById)

router.delete('/:ofertaId', ofertaCtrl.deleteofertaById)



export default router;