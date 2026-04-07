import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ThemeProvider } from '../components/theme-provider'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import '../styles/globals.css'

import Dashboard from './pages/Dashboard'
import Contatos from './pages/Contatos'
import Quadro from './pages/Quadro'
import Respostas from './pages/Respostas'
import Formularios from './pages/Formularios'
import Tags from './pages/Tags'

import { RelatoriosLayout } from './pages/relatorios/RelatoriosLayout'
import RelatoriosKanban from './pages/relatorios/RelatoriosKanban'
import RelatoriosAgendamentos from './pages/relatorios/RelatoriosAgendamentos'
import RelatoriosAtendimentos from './pages/relatorios/RelatoriosAtendimentos'
import RelatoriosFormularios from './pages/relatorios/RelatoriosFormularios'

import { ConfiguracoesLayout } from './pages/configuracoes/ConfiguracoesLayout'
import CriarQuadros from './pages/configuracoes/CriarQuadros'
import CriarFormulario from './pages/configuracoes/CriarFormulario'
import StatusRespostas from './pages/configuracoes/StatusRespostas'
import GerenciarUsuarios from './pages/configuracoes/GerenciarUsuarios'
import PermissoesMenu from './pages/configuracoes/PermissoesMenu'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true,                   element: <Dashboard />          },
      { path: 'contatos',              element: <Contatos />           },
      { path: 'quadro',                element: <Quadro />             },
      { path: 'respostas',             element: <Respostas />          },
      { path: 'formularios',           element: <Formularios />        },
      { path: 'tags',                  element: <Tags />               },
      {
        path: 'relatorios',
        element: <RelatoriosLayout />,
        children: [
          { index: true,               element: <Navigate to="kanban" replace /> },
          { path: 'kanban',            element: <RelatoriosKanban />        },
          { path: 'agendamentos',      element: <RelatoriosAgendamentos />  },
          { path: 'atendimentos',      element: <RelatoriosAtendimentos />  },
          { path: 'formularios',       element: <RelatoriosFormularios />   },
        ],
      },
      {
        path: 'configuracoes',
        element: <ConfiguracoesLayout />,
        children: [
          { index: true,               element: <Navigate to="criarquadros" replace /> },
          { path: 'criarquadros',      element: <CriarQuadros />       },
          { path: 'criarfomulario',    element: <CriarFormulario />    },
          { path: 'statusrespostas',   element: <StatusRespostas />    },
          { path: 'gernciarusuarios',  element: <GerenciarUsuarios />  },
          { path: 'permissoesmenu',    element: <PermissoesMenu />     },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="zyra-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
