from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List

from ..db.database import SessionLocal, Base, engine
from . import models
from ..schemas import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NeurAI Backend API")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/usuarios", response_model=schemas.Usuario)
def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = models.Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario


@app.get("/usuarios", response_model=List[schemas.Usuario])
def read_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    usuarios = db.query(models.Usuario).offset(skip).limit(limit).all()
    return usuarios


@app.post("/pesquisas", response_model=schemas.Pesquisas)
def create_pesquisa(pesquisa: schemas.PesquisasCreate, db: Session = Depends(get_db)):
    db_pesquisa = models.Pesquisas(**pesquisa.dict())
    db.add(db_pesquisa)
    db.commit()
    db.refresh(db_pesquisa)
    return db_pesquisa


@app.get("/pesquisas", response_model=List[schemas.Pesquisas])
def read_pesquisas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Pesquisas).offset(skip).limit(limit).all()


@app.post("/inter_categoria_pesquisas", response_model=schemas.InterCategoriaPesquisasCreate)
def create_inter_categoria_pesquisas(rel: schemas.InterCategoriaPesquisasCreate, db: Session = Depends(get_db)):
    db_rel = models.InterCategoriaPesquisas(**rel.dict())
    db.add(db_rel)
    db.commit()
    db.refresh(db_rel)
    return schemas.InterCategoriaPesquisasCreate(**rel.dict())


@app.get("/historico", response_model=List[schemas.Historico])
def read_historico(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Historico).offset(skip).limit(limit).all()


@app.post("/historico", response_model=schemas.Historico)
def create_historico(h: schemas.HistoricoCreate, db: Session = Depends(get_db)):
    db_h = models.Historico(**h.dict())
    db.add(db_h)
    db.commit()
    db.refresh(db_h)
    return db_h


@app.post("/categorias", response_model=schemas.Categoria)
def create_categoria(cat: schemas.CategoriaCreate, db: Session = Depends(get_db)):
    db_cat = models.Categoria(**cat.dict())
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat


@app.get("/categorias", response_model=List[schemas.Categoria])
def read_categorias(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Categoria).offset(skip).limit(limit).all()
