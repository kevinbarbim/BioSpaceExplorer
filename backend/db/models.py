from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
    senha = Column(String(64), nullable=False)  # storing UUID-like string
    id_historico = Column(Integer, ForeignKey("historico.id"), nullable=True)

    historico = relationship("Historico", back_populates="usuario_rel")


class Pesquisas(Base):
    __tablename__ = "pesquisas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(512), nullable=False)
    autor = Column(String(255), nullable=True)
    referencia = Column(String(512), nullable=True)
    palavras_chaves = Column(String(512), nullable=True)
    resumo = Column(Text, nullable=True)
    link = Column(String(1024), nullable=True)
    astros = Column(String(255), nullable=True)
    id_categoria_pesquisa = Column(Integer, ForeignKey("categorias.id"), nullable=True)

    categoria = relationship("Categoria", back_populates="pesquisas")
    historicos = relationship("Historico", back_populates="pesquisa_rel")
    inter_produtos = relationship("InterCategoriaPesquisas", back_populates="pesquisa_rel")


class InterCategoriaPesquisas(Base):
    __tablename__ = "inter_categoria_pesquisas"

    id = Column(Integer, primary_key=True, index=True)
    id_pesquisa = Column(Integer, ForeignKey("pesquisas.id"))
    id_categoria = Column(Integer, ForeignKey("categorias.id"))

    pesquisa_rel = relationship("Pesquisas", back_populates="inter_produtos")
    categoria_rel = relationship("Categoria", back_populates="inter_rel")


class Historico(Base):
    __tablename__ = "historico"

    id = Column(Integer, primary_key=True, index=True)
    data_insercao = Column(String(32), nullable=True)  # could be datetime in a real app
    id_usuario = Column(Integer, ForeignKey("usuario.id"))
    id_pesquisas = Column(Integer, ForeignKey("pesquisas.id"))

    usuario_rel = relationship("Usuario", back_populates="historico")
    pesquisa_rel = relationship("Pesquisas", back_populates="historicos")


class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True, index=True)
    data_insercao = Column(String(32), nullable=True)
    nome = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=True)
    id_categoria_pesquisa = Column(Integer, nullable=True)  # relationship to pesquisas if needed

    pesquisas = relationship("Pesquisas", back_populates="categoria")
    inter_rel = relationship("InterCategoriaPesquisas", back_populates="categoria_rel")
