import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("uso: recorta.swift <entrada> <saida.png>\n".data(using: .utf8)!)
    exit(2)
}
let entrada = URL(fileURLWithPath: args[1])
let saida = URL(fileURLWithPath: args[2])

guard let imagem = CIImage(contentsOf: entrada) else {
    FileHandle.standardError.write("nao consegui ler a imagem\n".data(using: .utf8)!); exit(1)
}

let handler = VNImageRequestHandler(ciImage: imagem, options: [:])
let pedido = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([pedido])
    guard let obs = pedido.results?.first else {
        FileHandle.standardError.write("nenhum sujeito detectado\n".data(using: .utf8)!); exit(1)
    }
    // mascara de TODAS as instancias, ja reescalada para o tamanho da imagem
    let buffer = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
    let mascara = CIImage(cvPixelBuffer: buffer)

    let branco = CIImage(color: CIColor.white).cropped(to: imagem.extent)

    guard let filtro = CIFilter(name: "CIBlendWithMask") else { exit(1) }
    filtro.setValue(imagem, forKey: kCIInputImageKey)
    filtro.setValue(branco, forKey: kCIInputBackgroundImageKey)
    filtro.setValue(mascara, forKey: kCIInputMaskImageKey)

    guard let resultado = filtro.outputImage else {
        FileHandle.standardError.write("filtro falhou\n".data(using: .utf8)!); exit(1)
    }

    let ctx = CIContext()
    try ctx.writePNGRepresentation(of: resultado.cropped(to: imagem.extent),
                                   to: saida, format: .RGBA8,
                                   colorSpace: CGColorSpaceCreateDeviceRGB())
    let n = obs.allInstances.count
    print("ok — \(n) instancia(s) de sujeito")
} catch {
    FileHandle.standardError.write("erro: \(error)\n".data(using: .utf8)!); exit(1)
}
