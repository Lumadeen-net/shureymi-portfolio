/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Home from './pages/Home';
import Story from './pages/Story';
import Leadership from './pages/Leadership';
import Ideas from './pages/Ideas';
import Mandera from './pages/Mandera';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/mandera" element={<Mandera />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}
