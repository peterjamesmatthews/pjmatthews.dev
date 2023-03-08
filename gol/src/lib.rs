use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    next: Vec<Cell>,
}

impl Universe {
    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }

    fn count_live_neighbors(&self, row: u32, col: u32) -> u8 {
        let mut count: u8 = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                let index = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[index] as u8;
            }
        }
        count
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn new(height: u32, width: u32) -> Universe {
        let cells = (0..height * width)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();
        let next = (0..height * width).map(|_| Cell::Dead).collect();
        Universe {
            height,
            width,
            cells,
            next,
        }
    }

    pub fn tick(&mut self) {
        for row in 0..self.height {
            for col in 0..self.height {
                let index = self.get_index(row, col);
                let cell = self.cells[index];
                let live_neighbors = self.count_live_neighbors(row, col);
                self.next[index] = match (cell, live_neighbors) {
                    (Cell::Alive, 0) | (Cell::Alive, 1) => Cell::Dead, // underpopulation
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive, // survives
                    (Cell::Alive, _) => Cell::Dead,                    // overpopulation
                    (Cell::Dead, 3) => Cell::Alive,                    // reproduction
                    (Cell::Dead, _) => Cell::Dead,
                };
            }
        }
        self.cells = self.next.clone();
    }

    #[allow(non_snake_case)]
    pub fn getCells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
}
