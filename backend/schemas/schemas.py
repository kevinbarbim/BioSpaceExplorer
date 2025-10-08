from typing import Optional, List
from pydantic import BaseModel


class UsuarioCreate(BaseModel):
    nome: str
    senha: str
    id_historico: Optional[int] = None


class Usuario(BaseModel):
    id: int
    nome: str
    senha: str
    id_historico: Optional[int] = None

    class Config:
        orm_mode = True


class PesquisasCreate(BaseModel):
    titulo: str
    autor: Optional[str] = None
    referencia: Optional[str] = None
    palavras_chaves: Optional[str] = None
    resumo: Optional[str] = None
    link: Optional[str] = None
    astros: Optional[str] = None
    id_categoria_pesquisa: Optional[int] = None


class Pesquisas(BaseModel):
    id: int
    titulo: str
    autor: Optional[str] = None
    referencia: Optional[str] = None
    palavras_chaves: Optional[str] = None
    resumo: Optional[str] = None
    link: Optional[str] = None
    astros: Optional[str] = None
    id_categoria_pesquisa: Optional[int] = None

    class Config:
        orm_mode = True


class InterCategoriaPesquisasCreate(BaseModel):
    id_pesquisa: int
    id_categoria: int


class HistoricoCreate(BaseModel):
    id_usuario: int
    id_pesquisas: int
    data_insercao: Optional[str] = None


class Historico(BaseModel):
    id: int
    data_insercao: Optional[str] = None
    id_usuario: int
    id_pesquisas: int

    class Config:
        orm_mode = True


class CategoriaCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None
    data_insercao: Optional[str] = None
    id_categoria_pesquisa: Optional[int] = None


class Categoria(BaseModel):
    id: int
    data_insercao: Optional[str] = None
    nome: str
    descricao: Optional[str] = None
    id_categoria_pesquisa: Optional[int] = None

    class Config:
        orm_mode = True
