package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.CreateTransakcjaRequest;
import pl.bj.bank.dto.TransakcjeResponse;
import pl.bj.bank.model.Transakcje;
import pl.bj.bank.service.TransakcjeService;

import java.util.List;

@RestController
@RequestMapping("/api/transakcje")
@RequiredArgsConstructor
public class TransakcjeController {

    private final TransakcjeService transakcjeService;

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody CreateTransakcjaRequest req) {
        try {
            Transakcje t = transakcjeService.createTransfer(req);
            TransakcjeResponse r = new TransakcjeResponse();
            r.setIdTransakcji(t.getIdTransakcji());
            r.setNrKonta(t.getKonto().getNrKonta());
            r.setDataTransakcji(t.getDataTransakcji());
            r.setTypTransakcji(t.getTypTransakcji());
            r.setKwota(t.getKwota());
            r.setWaluta(t.getWaluta());
            r.setOpis(t.getOpis());
            r.setSaldoPo(t.getSaldoPo());
            if (t.getKonto() != null && t.getKonto().getKlient() != null) {
                r.setKlientImie(t.getKonto().getKlient().getImie());
                r.setKlientNazwisko(t.getKonto().getKlient().getNazwisko());
            }
            if (t.getKonto() != null && t.getKonto().getTypKonta() != null) {
                r.setTypKonta(t.getKonto().getTypKonta().toString());
            }
            return ResponseEntity.ok(r);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Błąd serwera");
        }
    }

    @GetMapping("/konto/{nrKonta}")
    public ResponseEntity<?> getForKonto(@PathVariable Long nrKonta) {
        try {
            List<Transakcje> list = transakcjeService.getForKonto(nrKonta);
            List<TransakcjeResponse> resp = list.stream().map(t -> {
                TransakcjeResponse r = new TransakcjeResponse();
                r.setIdTransakcji(t.getIdTransakcji());
                r.setNrKonta(t.getKonto().getNrKonta());
                r.setDataTransakcji(t.getDataTransakcji());
                r.setTypTransakcji(t.getTypTransakcji());
                r.setKwota(t.getKwota());
                r.setWaluta(t.getWaluta());
                r.setOpis(t.getOpis());
                r.setSaldoPo(t.getSaldoPo());
                if (t.getKonto() != null && t.getKonto().getKlient() != null) {
                    r.setKlientImie(t.getKonto().getKlient().getImie());
                    r.setKlientNazwisko(t.getKonto().getKlient().getNazwisko());
                }
                if (t.getKonto() != null && t.getKonto().getTypKonta() != null) {
                    r.setTypKonta(t.getKonto().getTypKonta().toString());
                }
                // attempt to find related account via opposite transfer record (not guaranteed)
                // if transaction is TRANSFER_IN or TRANSFER_OUT, try to infer related account from description or other data in future
                return r;
            }).toList();
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Błąd serwera");
        }
    }
}
