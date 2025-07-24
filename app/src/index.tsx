import { root } from '@lynx-js/react'
import { MemoryRouter, Routes, Route } from 'react-router';

import { App } from './pages/App.js'
import {Words} from "./pages/Words.js";

root.render(
    <MemoryRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/words" element={<Words />} />
        </Routes>
    </MemoryRouter>
);


if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
