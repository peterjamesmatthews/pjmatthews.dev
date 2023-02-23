use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculateCount(count: i32) -> i32 {
    count + 1
}
