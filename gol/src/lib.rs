use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

/// The universe for an instance of Conway's Game of Life.
#[wasm_bindgen]
pub struct Universe {
    /// The width of the universe.
    width: u32,
    /// The height of the universe.
    height: u32,
    /// One-dimensional vector of cells that represents the universe.
    cells: Vec<Cell>,
    /// One-dimensional vector of indices that will hold the indicies of cells that will change
    /// after this universe ticks.
    diffs: Vec<usize>,
}

impl Universe {
    /// Given a row and column, return the corresponding index in `self.cells`
    fn get_index(&self, row: u32, col: u32) -> usize {
        (col * self.width + row) as usize
    }

    /// Given a row and column, return the number of live neighbors.
    fn count_live_neighbors(&self, row: u32, col: u32) -> u8 {
        let mut count: u8 = 0;
        for delta_row in [self.height - 1, 0, 1] {
            for delta_col in [self.width - 1, 0, 1] {
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
    /// Given a height and width, return a new universe.
    pub fn new(height: u32, width: u32) -> Universe {
        let size = usize::try_from(height * width).unwrap(); // TODO this should unwrap or else throw a JS error that the universe size is too big
        let cells = (0..size)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();
        let diffs = (0..size).collect();
        Universe {
            width,
            height,
            cells,
            diffs,
        }
    }

    /// Given the current universe, computes the next universe and returns the number of cells that
    /// changed.
    pub fn tick(&mut self) -> usize {
        let mut num_diffs: usize = 0;

        for row in 0..self.height {
            for col in 0..self.width {
                let cell_index = self.get_index(row, col);
                let cell = self.cells[cell_index];
                let live_neighbors = self.count_live_neighbors(row, col);

                let diff = match (cell, live_neighbors) {
                    (Cell::Alive, 2 | 3) => false, // survives
                    (Cell::Alive, _) => true,      // dies from underpopulation or overpopulation
                    (Cell::Dead, 3) => true,       // born from reproduction
                    (Cell::Dead, _) => false,
                };

                if diff {
                    self.diffs[num_diffs] = cell_index;
                    num_diffs += 1;
                }
            }
        }

        for cell_index in &self.diffs[0..num_diffs] {
            self.cells[*cell_index] = match self.cells[*cell_index] {
                Cell::Alive => Cell::Dead,
                Cell::Dead => Cell::Alive,
            };
        }

        num_diffs
    }

    /// Returns a pointer to the start of buffer which contains this universe's cells.
    #[allow(non_snake_case)]
    pub fn getCells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
    /// Returns a pointer to the start of a buffer that will track the indicies of cells change
    /// after this universe ticks.
    #[allow(non_snake_case)]
    pub fn getDiffs(&self) -> *const usize {
        self.diffs.as_ptr()
    }
}

#[cfg(test)]
mod test {
    use crate::Cell::{Alive, Dead};
    use crate::Universe;

    #[test]
    fn ticks() {
        let mut universe = Universe::new(3, 3);
        /*
           1	0	0

           1	1	0

           0	0	0
        */
        universe.cells = vec![Alive, Alive, Dead, Dead, Alive, Dead, Dead, Dead, Dead];
        universe.tick();
        /*
           1	1	1

           1	1	1

           1	1	1
        */
        assert_eq!(universe.cells, vec![Alive; 9]);
    }
}
